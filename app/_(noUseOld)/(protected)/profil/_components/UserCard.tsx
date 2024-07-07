import Image from 'next/image'

interface UserCardProps {
  user: {
    profilePhoto: string
    name: string
    tag: string
    age: number
  }
}

const UserCard1: React.FC<UserCardProps> = ({ user }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-6 bg-white">
      <Image
        className="w-full h-48 object-cover rounded-full mx-auto"
        src={user.profilePhoto}
        alt={`${user.name}'s profile photo`}
        width={192}
        height={192}
      />
      <div className="text-center mt-4">
        <div className="font-bold text-xl mb-2">{user.name}</div>
        <p className="text-gray-700 text-base">{user.tag}</p>
      </div>
      <div className="text-center mt-4">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          Age: {user.age}
        </span>
      </div>
      <div className="text-center mt-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Follow
        </button>
      </div>
    </div>
  )
}

export default UserCard1
