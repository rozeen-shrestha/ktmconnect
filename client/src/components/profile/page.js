'use client';
import React from 'react';
import { Card, Divider, CardHeader, CardBody, CardFooter, Avatar, Button } from '@nextui-org/react';

const Profile = () => {
  const [isFollowed, setIsFollowed] = React.useState(false);

  return (
    <Card className="max-w-[400px] rounded-md bg-[#171215]">
      <CardHeader>
        <div className="flex items-center w-full">
          <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" className="w-20 h-20" />
          <div className="ml-auto">
            <button className="bg-green-600 font-medium py-2 px-2 rounded">
              Send Message
            </button>
          </div>
        </div>
      </CardHeader>

      <CardBody className="px-3 py-0 text-small text-default-400">
        <div className="bg-black rounded-md w-full h-full font-sans">
          <div className="m-2">
            <p className="text-xl text-white">Rozeen Shrestha</p>
            <p className="text-l mx-1 text-white">userid</p>
            <Divider className="my-3 bg-gray-50" />
            <p className="font-bold text-white font-500 mt-1">USER SINCE</p>
            <p className="text-gray mx-1">2020/20/20</p>
            <p className="font-bold text-white font-500 mt-1">ROLES</p>
            <div className="text-gray mx-1">
            <Button size="sm" color='success' className='m-.5' radius="full">
              <p className='text-sm'>@Carpenter</p>
            </Button>
            </div>
          </div>
        </div>
      </CardBody>
      <CardFooter className="gap-2"></CardFooter>
    </Card>
  );
};

export default Profile;
