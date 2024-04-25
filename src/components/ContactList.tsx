import React, { useEffect, useMemo } from 'react'

import { Contact } from '../App'
import { DeleteButton } from '../icons'

interface ContactListProps {
  contacts: Contact[]
  selectedContact: Contact | null
  onContactSelect: (contact: Contact) => void
  onDeleteContact: () => void
  mode: 'edit' | 'create' | 'read'
}

const ContactList: React.FC<ContactListProps> = ({
  contacts,
  selectedContact,
  onContactSelect,
  onDeleteContact,
  mode,
}) => {
  // Group contacts by first letter of last name and sort them
  const groupedContacts = useMemo(() => {
    const groupedList: { [key: string]: Contact[] } = {}
    contacts.forEach((contact) => {
      const key = contact.lastName.charAt(0).toUpperCase()
      groupedList[key] = groupedList[key] || []
      groupedList[key].push(contact)
    })

    // Sort grouped contacts by last name within each group
    for (const key in groupedList) {
      groupedList[key].sort((a, b) => a.lastName.localeCompare(b.lastName))
    }
    return groupedList
  }, [contacts])

  useEffect(() => {
    if (!selectedContact && mode !== 'create') {
      onContactSelect(
        groupedContacts[Object.keys(groupedContacts).sort()[0]][0]
      )
    }
  }, [groupedContacts, onContactSelect, selectedContact])

  return (
    <div>
      {Object.keys(groupedContacts)
        .sort()
        .map((key) => (
          <React.Fragment key={key}>
            <div className='ml-2 py-2 text-slate-500 border-b border-slate-400'>
              {key}
            </div>
            {groupedContacts[key].map((contact, index) => (
              <div
                key={contact.id}
                className={`box-border flex justify-between font-semibold pr-1 py-1 pl-8 cursor-pointer ${
                  contact.id === selectedContact?.id
                    ? 'bg-blue-600 text-white'
                    : ''
                }`}
                onClick={() => onContactSelect(contact)}
              >
                <span className='overflow-hidden whitespace-nowrap w-4/5 text-ellipsis'>
                  {contact.firstName} {contact.lastName}
                </span>
                {contact.id === selectedContact?.id && mode === 'edit' && (
                  <DeleteButton
                    className='ml-4'
                    width={20}
                    height={20}
                    color='red'
                    onClick={(e) => {
                      e.stopPropagation()
                      onDeleteContact()
                    }}
                  />
                )}
              </div>
            ))}
          </React.Fragment>
        ))}
    </div>
  )
}

export default ContactList
