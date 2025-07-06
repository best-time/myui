import { useState } from "react";
type obj = {
  id: number
  name: string
  email: string
}

export default function Messenger() {
  const [to, setTo] = useState(contacts[0]);
  return (
    <div>
      <ContactList
        contacts={contacts}
        selectedContact={to}
        onSelect={(contact: obj) => setTo(contact)}
      />
      <Chat key={to.id} contact={to} />
    </div>
  );
}

const contacts: obj[] = [
  { id: 0, name: "Taylor", email: "taylor@mail.com" },
  { id: 1, name: "Alice", email: "alice@mail.com" },
  { id: 2, name: "Bob", email: "bob@mail.com" },
];

function ContactList({ selectedContact, contacts, onSelect }: { selectedContact: obj, contacts: obj[], onSelect: (contact: obj) => void }) {
  return (
    <section className="contact-list">
        {contacts.map((contact: obj) => (
          <span key={contact.id}>
            <button
              onClick={() => {
                onSelect(contact);
              }}
            >
              {contact.name}
            </button>
          </span>
        ))}
    </section>
  );
}

function Chat({ contact }: { contact: obj }) {
  const [text, setText] = useState("");
  return (
    <section className="chat">
      <textarea
        value={text}
        placeholder={"跟 " + contact.name + " 聊一聊"}
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      <button>发送到 {contact.email}</button>
    </section>
  );
}
