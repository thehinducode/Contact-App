import React, { useCallback, useRef, useState } from 'react'

import { mockContacts } from './mockData/mockContacts'

import { ContactList, ContactForm, ContactDetails } from './components'

export type Contact = {
  id: string
  firstName: string
  lastName: string
  phone: string
  email: string
  address: string
  notes: string
}

const App: React.FC = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [contacts, setContacts] = useState<Contact[]>(mockContacts)
  const [mode, setMode] = useState<'read' | 'edit' | 'create'>('read')
  const contactFormRef = useRef<HTMLFormElement>(null)

  const handleContactSelect = useCallback(
    (contact: Contact) => {
      setSelectedContact(contact)
      if (mode === 'create') {
        setMode('read')
      }
    },
    [mode]
  )

  const handleCreateModeToggle = useCallback(() => {
    setMode('create')
    setSelectedContact(null)
  }, [])

  const handleDoneButtonClick = () => {
    if (contactFormRef.current) {
      const formFields = contactFormRef.current.elements
      let isEmpty = true

      // Check if any form field has a value
      for (let i = 0; i < formFields.length; i++) {
        const element = formFields[i] as HTMLInputElement | HTMLTextAreaElement
        if (element.value.trim() !== '') {
          isEmpty = false
          break
        }
      }

      if (isEmpty) {
        alert('Please fill out the form before proceeding')
      } else {
        contactFormRef.current.checkValidity()
        contactFormRef.current.dispatchEvent(
          new Event('submit', { cancelable: true, bubbles: true })
        )
      }
    }
  }

  const handleEditModeToggle = () => {
    setMode('edit') // Switch to edit mode
  }

  const handleDoneClick = (contact: Contact) => {
    if (mode === 'edit') {
      const updatedContacts = contacts.map((c) =>
        JSON.stringify(c) === JSON.stringify(selectedContact)
          ? { ...contact }
          : c
      )
      setContacts(updatedContacts)
    } else {
      setContacts([...contacts, contact])
    }
    const selectedUpdateContact = contacts.find(
      (c) => JSON.stringify(c) === JSON.stringify(contact)
    )
    setSelectedContact(selectedUpdateContact || contact)
    setMode('read')
  }

  const handleDeleteContact = () => {
    const updatedContacts = contacts.filter(
      (contact) => contact !== selectedContact
    )
    setContacts(updatedContacts)
    setSelectedContact(null)
  }

  return (
    <div className='flex'>
      <div className='w-1/5 pt-16 bg-gray-300 overflow-y-auto max-h-screen'>
        <ContactList
          contacts={contacts}
          selectedContact={selectedContact}
          onContactSelect={handleContactSelect}
          onDeleteContact={handleDeleteContact}
          mode={mode}
        />
      </div>
      <div className='pt-8 w-4/5 relative'>
        {mode === 'create' || mode === 'edit' ? (
          <ContactForm
            ref={contactFormRef}
            onSubmit={handleDoneClick}
            selectedContact={selectedContact}
          />
        ) : (
          <ContactDetails contact={selectedContact} />
        )}
        <div className='absolute bottom-4 left-4'>
          <button
            className={`font-bold py-2 px-4 rounded shadow-md ${
              mode === 'create' || (mode === 'edit' && 'cursor-not-allowed')
            }`}
            onClick={handleCreateModeToggle}
            disabled={mode === 'create' || mode === 'edit'}
          >
            +
          </button>
        </div>
        <div className='absolute bottom-4 right-4'>
          {mode === 'create' || mode === 'edit' ? (
            <button
              className='font-bold py-2 px-4 rounded shadow-md '
              onClick={handleDoneButtonClick}
            >
              Done
            </button>
          ) : (
            <button
              className='font-bold py-2 px-4 rounded shadow-md'
              onClick={handleEditModeToggle}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
