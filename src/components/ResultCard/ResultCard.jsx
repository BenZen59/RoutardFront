import { Link } from 'react-router-dom';

const ResultCard = ({ pays }) => {
  const { codeIso31661, nomPays } = pays;
  return (
    <div className='mt-3 w-[300px] h-[50px] pl-3 bg-gray-700 text-white rounded-md z-50'>
      <Link to={`/detailspays/${codeIso31661}`} className='flex'>
        <h1 className='text-2xl mt-3 w-[700px] h-10 overflow-hidden'>
          {nomPays}
        </h1>
      </Link>
    </div>
  );
};

export default ResultCard;
