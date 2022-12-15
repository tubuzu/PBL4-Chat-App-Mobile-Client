import React, { Dispatch, useEffect, useState } from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { createConversationThunk } from "../../../store/conversations/conversationSlice";
import { searchUsers } from "../../../utils/apis";
import { useDebounce } from "../../../utils/hooks/useDebounce";
import { User } from "../../../utils/types";
import RecipientField from "../../recipients/RecipientField";
import { RecipientResultContainer } from "../../recipients/RecipientResultContainer";
import FormContainer from "../FormContainer";
// import FormInput from "../FormInput";
import FormSubmitButton from "../FormSubmitButton";

type Props = {
  setShowModal: Dispatch<React.SetStateAction<boolean>>;
};

function AddConversationForm({ setShowModal }: Props) {
  const [query, setQuery] = useState("");
  const [userResults, setUserResults] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User>();
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
    if (!selectedUser) return;
    return dispatch(createConversationThunk({ userId: selectedUser._id }))
      .unwrap()
      .then(({ data }) => {
        // console.log(data);
        console.log("done");
        setShowModal(false);
        // navigate(`/home/conversations/${data._id}`);
      })
      .catch((err) => console.log(err));
  };

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setUserResults([]);
    setQuery("");
  };

  return (
    <FormContainer widthScale={0.9}>
      <RecipientField
        selectedUser={selectedUser}
        setQuery={setQuery}
        setSelectedUser={setSelectedUser}
      />
      {!selectedUser && userResults.length > 0 && query && (
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

export default AddConversationForm;
