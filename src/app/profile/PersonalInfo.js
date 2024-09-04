import React from 'react'
import { useProfileStore } from '../components/store';
import {
    formatDate,
  } from '../utility/Utilitis'
function Personalinfo() {
    const { profile} = useProfileStore();
  return (
    <div className='p-5'>
        <div className='flex '>
            <div className='w-6/12'>
                <p className='text-gray-400 capitalize font-medium'>
                    first name 
                </p>
                <p className='text-gray-800 capitalize font-medium'>
                    {profile.first_name}
                </p>
            </div>
            <div className='w-6/12'>
            <p className='text-gray-400 capitalize font-medium'>
                    last name
                </p>
                <p className='text-gray-800 capitalize font-medium'>
                    {profile.last_name}
                </p>
            </div>
        </div>
        <hr className='mt-3 mb-3'></hr>

        <div className='flex '>
            <div className='w-6/12'>
                <p className='text-gray-400 capitalize font-medium'>
                    mobile phone
                </p>
                <p className='text-gray-800 capitalize font-medium'>
                    {profile.phone}
                </p>
            </div>
            <div className='w-6/12'>
            <p className='text-gray-400 capitalize font-medium'>
                   email
                </p>
                <p className='text-gray-800 capitalize font-medium'>
                    {profile.email}
                </p>
            </div>
        </div>

        <hr className='mt-3 mb-3'></hr>

        <div className='flex '>
            <div className='w-6/12'>
                <p className='text-gray-400 capitalize font-medium'>
                    date of join
                </p>
                <p className='text-gray-800 capitalize font-medium'>
                    {formatDate(profile.date_joined)}
                </p>
            </div>
            <div className='w-6/12'>
            <p className='text-gray-400 capitalize font-medium'>
                    bio
                </p>
                <p className='text-gray-800 capitalize font-medium'>
                    {profile.bio}
                </p>
            </div>
        </div>
    </div>
  )
}

export default Personalinfo