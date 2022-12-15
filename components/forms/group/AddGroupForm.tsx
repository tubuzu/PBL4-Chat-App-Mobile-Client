import React, { Dispatch, useEffect, useState } from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { createGroupThunk } from "../../../store/groups/groupSlice";
import { searchUsers } from "../../../utils/apis";
import { useDebounce } from "../../../utils/hooks/useDebounce";
import { User } from "../../../utils/types";
import { RecipientResultContainer } from "../../recipients/RecipientResultContainer";
import SelectedGroupRecipientChip from "../../recipients/SelectedGroupRecipientChip";
import FormContainer from "../FormContainer";
import FormInput from "../FormInput";
import FormSubmitButton from "../FormSubmitButton";
import { RecipientChipContainer } from "../styles";

type Props = {
  setShowModal: Dispatch<React.SetStateAction<boolean>>;
};

function AddGroupForm({ setShowModal }: Props) {
  const [title, setTitle] = useState('');
  const [query, setQuery] = useState("");
  const [userResults, setUserResults] = useState<User[]>([]);
  const [selectedRecipients, setSelectedRecipients] = useState<User[]>([]);
  const [searching, setSearching] = useState(false);
  // const [message, setMessage] = useState('');
  const debouncedQuery = useDebounce(query, 1000);
  const dispatch = useDispatch<AppDispatch>();
  //   const navigate = useNavigate();

  useEffect(() => {
    if (debouncedQuery) {
      setSearching(true);
      searchUsers(debouncedQuery)
        .then(({ data }) => {
          //   console.log(data);
          setUserResults(data);
        })
        .catch((err) => console.log(err))
        .finally(() => setSearching(false));
    }
  }, [debouncedQuery]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedRecipients.length === 0 || !title) return;
    const users = selectedRecipients.map((user) => user._id);
    return dispatch(createGroupThunk({ title, users }))
      .unwrap()
      .then(({ data }) => {
        console.log(data);
        console.log('done');
        setShowModal(false);
      })
      .catch((err) => console.log(err));
  };

  const handleUserSelect = (user: User) => {
    const exists = selectedRecipients.find((u) => u._id === user._id);
    if (!exists) setSelectedRecipients((prev) => [...prev, user]);
    setUserResults([]);
    setQuery('');
  };

  const removeUser = (user: User) =>
    setSelectedRecipients((prev) => prev.filter((u) => u._id !== user._id));

  return (
    <FormContainer widthScale={0.9}>
      <RecipientChipContainer>
        {selectedRecipients.map((user) => (
          <SelectedGroupRecipientChip key={user._id} user={user} removeUser={removeUser} />
        ))}
      </RecipientChipContainer>
      {/* <GroupRecipientsField query={query} setQuery={setQuery} /> */}
      <FormInput
        value={query}
        onChangeText={(value: any) => setQuery(value)}
        label="Recipients:"
        placeholder="search"
        autoCapitalize="none"
      />
      {userResults.length > 0 && query && (
        <RecipientResultContainer
          userResults={userResults}
          handleUserSelect={handleUserSelect}
        />
      )}
      <FormInput
        value={title}
        onChangeText={(value: any) => setTitle(value)}
        label="Title"
        placeholder="Group title"
        autoCapitalize="none"
      />
      <View style={{ height: 10 }}></View>
      <FormSubmitButton title="Submit" onPress={onSubmit} />
    </FormContainer>
  );
}

export default AddGroupForm;
