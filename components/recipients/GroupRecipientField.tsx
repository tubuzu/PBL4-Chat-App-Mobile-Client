import React, { Dispatch, FC, SetStateAction } from 'react';

type Props = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
};

export const GroupRecipientsField: FC<Props> = ({ query, setQuery }) => {
  return (
    <section>
      <InputContainer backgroundColor="#161616">
        <InputLabel>Recipient</InputLabel>
        <InputField value={query} onChange={(e) => setQuery(e.target.value)} />
      </InputContainer>
    </section>
  );
};
