'use client';
import { useEffect ,useCallback} from 'react';
import Image from 'next/image';
import axios from 'axios';
import BreadCrumbs from '../components/BreadCrumbs'
import { useRouter } from 'next/navigation';
import { Button } from 'primereact/button';
import Taps from './Taps'
import { useProfileStore, useTokenStore } from '../store/useStore';
const ProfilePage = () => {
  const { profile, setProfile, error, setError } = useProfileStore();
  const token = useTokenStore(state => state.token);
  const router = useRouter();
  
  const fetchProfile = useCallback(async () => {
    try {
      if (!token) {
        throw new Error('No token provided');
      }
      const response = await axios.get(
        'https://cyparta-backend-gf7qm.ondigitalocean.app/api/profile/',
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
      setError(error.message || 'An error occurred while fetching profile data.');
    }
  }, [token, setProfile, setError]);

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);

    useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (!profile) {
    return <div>Loading...</div>;
  }



  return (
    <div className="h-screen bg-gray-100">
     <BreadCrumbs/>
      
        {/* Profile Information */}
      
          <div className="flex items-center justify-between ">
            <div className='flex items-center'>

            <div className="w-36 h-36 overflow-hidden border-4 border-white">
              <Image
                src={profile.image}
                alt={`${profile.first_name} ${profile.last_name}`}
                width={144}
                height={144}
                objectFit="cover"
              />
            </div>
            <div className="ml-6">
              <h1 className="text-3xl font-semibold text-gray-800 capitalize">{`${profile.first_name} ${profile.last_name}`}</h1>
              <div className='flex gap-2'>
              <i className="pi pi-envelope text-gray-600 mt-1" style={{ fontSize: '1rem' }}></i><span className="text-gray-600">{profile.email}</span>
              </div>
              <div className='flex gap-2'>
              <i className="pi pi-inbox text-gray-600 mt-1" style={{ fontSize: '1rem' }}></i><span className="text-gray-600">{profile.bio}</span>
              </div>
            </div>
            </div>
            <div>
            <Button label="Edit profile" icon="pi pi-pencil" className="bg-black hover:bg-bluegray-400 border-bluegray-700 px-4 py-3 rounded-lg text-white"/>
            </div>
          </div>
   
     <div>
      <Taps/>
     </div>


    </div>
  );
};

export default ProfilePage;
