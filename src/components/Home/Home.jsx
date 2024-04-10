import Logo from '../../img/logo.png';
import Header from './../Header/Header';

export default function Home() {
  return (
    <>
      <Header />
      <div className='flex justify-center'>
        <h1 className='text-8xl font-bold ml-[-500px]'>Routard</h1>
        <img src={Logo} alt='logo' />
      </div>
    </>
  );
}
