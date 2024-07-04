import React from 'react'
import styles from './NavigationBar.module.css'

const NavigationBar: React.FC = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.navItem}>الرئيسية</div>
      <div className={styles.navItem}>الأنشطة</div>
      <div className={styles.navItem}>المحادثات</div>
      <div className={styles.navItem}>الإعدادات</div>
    </div>
  )
}

export default NavigationBar
