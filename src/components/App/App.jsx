import {
  React,
  useState,
  useEffect,
  nanoid,
  contactsTest,
  ContactForm,
  ContactList,
  Filter,
  Container,
  Title,
  SubTitle,
} from 'components/App/exports';

const localСontacts = localStorage.getItem('contacts');

export default function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(localСontacts) || contactsTest
  );

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const changeFilter = e => setFilter(e.currentTarget.value);

  const getFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const onAddContact = ({ name, number }) => {
    if (name && number) {
      const newContact = {
        id: nanoid(),
        name: name,
        number: number,
      };

      const isContactExist = contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      );

      if (isContactExist) return alert(`${name} is already in contacts`);

      setContacts(prevContacts => [newContact, ...prevContacts]);
    }
  };

  const onContactDelete = id =>
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );

  return (
    <Container>
      <Title>Phonebook</Title>
      <ContactForm onSubmit={onAddContact} />
      <SubTitle>Contacts</SubTitle>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        contacts={contacts}
        getFilteredContacts={getFilteredContacts}
        onContactDelete={onContactDelete}
      />
    </Container>
  );
}
