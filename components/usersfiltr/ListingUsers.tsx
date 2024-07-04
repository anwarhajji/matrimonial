import Image from 'next/image'
import Link from 'next/link'

interface iUserProps {
  imagePath: string
  country: string
  fullname: string
  age: number
  gender: string
  occupation: string
  userId: string | undefined
  //isInFavoriteList: boolean;
  //favoriteId: string;
  //homeId: string;
  //pathName: string;
}

export function ListingUsers({
  imagePath,
  country,
  fullname,
  age,
  gender,
  occupation
}: iUserProps) {
  return (
    <div className="flex flex-col">
      <div className="relative h-72">
        <Image
          src={`https://cplgsvpongmdzimtsflc.supabase.co/storage/v1/object/public/images/${imagePath}`}
          alt="Image of House"
          fill
          className="rounded-lg h-full object-cover"
        />
      </div>

      <Link href={`/home/${'homeId'}`} className="mt-2">
        <h3 className="font-medium text-base">
          {'country?.flag'} {'country?.label'} / {'country?.region'}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {'description'}
        </p>
        <p className="pt-2 text-muted-foreground">
          <span className="font-medium text-black">${'price'}</span> Night
        </p>
      </Link>
    </div>
  )
}
