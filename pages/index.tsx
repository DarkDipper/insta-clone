
import Image from 'next/image'
import Router from 'next/router'
import { useEffect, useContext } from 'react';
import { ThemeContext } from '../theme';
export default function Home() {
  return (
    <div className='main-page'>
      <p>Index page</p>
    </div>
  )
}
