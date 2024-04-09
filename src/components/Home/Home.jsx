import Logo from '../../img/logo.png';

export default function Home() {
  return (
    <div className='flex justify-center'>
      <h1 className='text-8xl font-bold ml-[-500px]'>Routard</h1>
      <img src={Logo} alt='logo' />
    </div>
  );
}
