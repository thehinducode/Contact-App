import React from 'react'

interface Contact {
  firstName: string
  lastName: string
  phone: string
  email: string
  address: string
  notes: string
}

interface ContactDetailsProps {
  contact: Contact | null
}

const ContactDetails: React.FC<ContactDetailsProps> = ({ contact }) => {
  return (
    <div className='flex-1 p-8'>
      <h2 className='text-4xl mb-4'>
        {contact?.firstName} {contact?.lastName}
      </h2>
      <div className='p-8'>
        {contact &&
          Object.keys(contact).map((k, idx) => (
            <React.Fragment key={k}>
              {idx > 2 && (
                <p className='flex my-4 border-b border-slate-200 gap-4'>
                  <span className='w-1/5 flex  justify-end text-slate-400'>
                    {k}{' '}
                  </span>{' '}
                  {k === 'email' ? (
                    <a
                      className='underline text-blue-600 hover:text-blue-800 visited:text-purple-400'
                      href={`mailto:${contact[k as keyof Contact]}`}
                    >
                      {contact[k as keyof Contact]}
                    </a>
                  ) : (
                    <span className='w-4/5'>{contact[k as keyof Contact]}</span>
                  )}
                </p>
              )}
            </React.Fragment>
          ))}
      </div>
    </div>
  )
}

export default ContactDetails
