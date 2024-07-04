import React from 'react'
import styles from './ProfileCard.module.css'

interface ProfileCardProps {
  percentage: number
  name: string
}

const ProfileCard: React.FC<ProfileCardProps> = ({ percentage, name }) => {
  return (
    <div className={styles.card}>
      <div className={styles.percentage}>{percentage}%</div>
      <div className={styles.name}>{name}</div>
    </div>
  )
}

export default ProfileCard
