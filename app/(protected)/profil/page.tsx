import UserCard1 from './_components/UserCard'

const Home: React.FC = () => {
  const user = {
    profilePhoto: '/BLUR2.jpg',
    name: 'John Doe',
    tag: '@johndoe',
    age: 28
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <UserCard1 user={user} />
    </div>
  )
}

export default Home
