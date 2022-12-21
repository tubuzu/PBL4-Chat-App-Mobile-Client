import { useRoute } from "@react-navigation/native";
import React, { Dispatch, useEffect, useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addGroupRecipient } from "../../../screens/Group/queries";
import { AppDispatch, RootState } from "../../../store";
import {
  createGroupThunk,
  selectGroupById,
} from "../../../store/groups/groupSlice";
import { searchUsers } from "../../../utils/apis";
import { useDebounce } from "../../../utils/hooks/useDebounce";
import { User } from "../../../utils/types";
import { RecipientResultContainer } from "../../recipients/RecipientResultContainer";
import SelectedGroupRecipientChip from "../../recipients/SelectedGroupRecipientChip";
import FormContainer from "../FormContainer";
import FormInput from "../FormInput";
import FormSubmitButton from "../FormSubmitButton";
import { RecipientChipContainer } from "../styles";
import Toast from "react-native-simple-toast";

type Props = {
  setShowModal: Dispatch<React.SetStateAction<boolean>>;
};

function AddGroupRecipientForm({ setShowModal }: Props) {
  const route: any = useRoute();
  const groupId = route.params.chatId;
  const group = useSelector((state: RootState) =>
    selectGroupById(state, groupId)
  );
  const [title, setTitle] = useState("");
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
          data = data.filter(
            (user) =>
              !group?.users.find(
                (member) => member._id.toString() === user._id.toString()
              )
          )!;
          setUserResults(data);
        })
        .catch((err) => console.log(err))
        .finally(() => setSearching(false));
    }
  }, [debouncedQuery]);

  const onSubmit = () => {
    if (selectedRecipients.length === 0) return;
    const recipients = selectedRecipients.map((user) => user._id);
    addGroupRecipient({ _id: groupId!, recipients: recipients })
      .then(() => {
        console.log("Recipient Added to Group");
        setSelectedRecipients([]);
        setShowModal(false);
        Toast.show("Added!", 1000);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const handleUserSelect = (user: User) => {
    const exists = selectedRecipients.find((u) => u._id === user._id);
    if (!exists) setSelectedRecipients((prev) => [...prev, user]);
    setUserResults([]);
    setQuery("");
  };

  const removeUser = (user: User) =>
    setSelectedRecipients((prev) => prev.filter((u) => u._id !== user._id));

  return (
    <FormContainer widthScale={0.9}>
      <RecipientChipContainer>
        {selectedRecipients.map((user) => (
          <SelectedGroupRecipientChip
            key={user._id}
            user={user}
            removeUser={removeUser}
          />
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
      <View style={{ height: 10 }}></View>
      <FormSubmitButton title="Submit" onPress={onSubmit} />
    </FormContainer>
  );
}

export default AddGroupRecipientForm;
