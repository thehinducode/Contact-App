import React, { forwardRef, useEffect, useState } from 'react'

import { Contact } from '../App'

interface IContactFormProps {
  onSubmit: (contact: Contact) => void
  selectedContact: Contact | null
}

const ContactForm = forwardRef<HTMLFormElement, IContactFormProps>(
  ({ onSubmit, selectedContact }, contactFormRef) => {
    const [contactDetails, setContactDetails] = useState<Contact>({
      id: generateId(),
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      address: '',
      notes: '',
    })

    useEffect(() => {
      if (selectedContact) {
        setContactDetails(selectedContact)
      }
    }, [selectedContact])

    const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target
      setContactDetails({ ...contactDetails, [name]: value })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      onSubmit(contactDetails)
      setContactDetails({
        id: generateId(),
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        address: '',
        notes: '',
      })
    }

    function generateId(): string {
      return '_' + Math.random().toString(36).substr(2, 9)
    }

    return (
      <form className='flex-1 p-8' onSubmit={handleSubmit} ref={contactFormRef}>
        <span className='flex text-4xl mb-4 gap-2'>
          <span className='flex flex-col'>
            <input
              className='outline outline-slate-400'
              type='text'
              value={contactDetails.firstName}
              name='firstName'
              onChange={handleInputChange}
            />
            <span className='flex justify-start text-base text-slate-400'>
              first name
            </span>
          </span>
          <span className='flex flex-col'>
            <input
              className='outline outline-slate-400'
              type='text'
              value={contactDetails.lastName}
              name='lastName'
              onChange={handleInputChange}
            />
            <span className='flex justify-start text-base text-slate-400'>
              last name
            </span>
          </span>
        </span>
        <div className='p-8'>
          {Object.keys(contactDetails).map((k, idx) => (
            <>
              {idx > 2 && (
                <p
                  className={`flex py-2 gap-4 ${
                    idx < Object.keys(contactDetails).length - 1
                      ? 'border-b border-slate-200'
                      : ''
                  }`}
                >
                  <span className='w-1/5 flex  justify-end text-slate-400'>
                    {k}{' '}
                  </span>{' '}
                  <div className='w-4/5'>
                    {idx > 4 ? (
                      <textarea
                        className='w-4/5 outline outline-slate-400'
                        name={k}
                        rows={3}
                        value={contactDetails[k as keyof Contact]}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <input
                        className='w-4/5 outline outline-slate-400'
                        type='text'
                        name={k}
                        value={contactDetails[k as keyof Contact]}
                        onChange={handleInputChange}
                      />
                    )}
                  </div>
                </p>
              )}
            </>
          ))}
        </div>
      </form>
    )
  }
)

export default ContactForm
