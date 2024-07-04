// components/Videos.tsx
import React from 'react'
import { Chip } from '@nextui-org/react'
import { VideoIcon } from 'lucide-react'

const Videos2: React.FC = () => (
  <div className="flex flex-col items-center space-y-2">
    <div className="flex items-center space-x-2">
      <VideoIcon />
      <span>Videos</span>
      <Chip size="sm" variant="faded">
        1
      </Chip>
    </div>
    <div>
      <p>Here is an interesting video:</p>
      <video controls width="250">
        <source src="/video1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
)

export default Videos2
