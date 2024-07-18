import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@nextui-org/react";
const Size = ({ sizeproduct, size, setsize }) => {
  console.log(size)
  return (
    <div className="w-[350px] left-4 h-full flex flex-col p-3">
    <div className='font-serif text-md text-slate-400 mb-5'>Kích cỡ</div>
      <div className="flex flex-row flex-wrap gap-4">
       {sizeproduct.map((el) => (
  <div
    key={el}
    onClick={() => {
      setsize((prevSize) => 
        Array.from(prevSize).includes(el)
          ? prevSize.filter((el1) => el1 !== el)
          : [...prevSize, el]
      );
    }}
    className={`border-2 bg-transparent border-slate-300 flex justify-center rounded-xl h-10 items-center w-[50px] ${Array.from(size).includes(el) ? 'border-[2px] bg-blue-400 text-white' : ''}`}
    icon={<FontAwesomeIcon icon={faPlus} />}
  >
    {el}
  </div>
))}
      </div>
    </div>
  );
};

export default Size;
