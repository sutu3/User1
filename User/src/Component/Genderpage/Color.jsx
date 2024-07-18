import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@nextui-org/react";
const Size = ({ colorproduct, color, setcolor }) => {
  return (
    <div className="w-[350px]  left-4 h-full flex flex-col p-3">
    <div className='font-serif text-md text-slate-400 mb-5'>Màu sắc</div>
      <div className="flex flex-row flex-wrap gap-2">
       {colorproduct.map((el) => (
  <div
    key={el}
    onClick={() => {
      setcolor((prevSize) => 
        Array.from(prevSize).includes(el)
          ? prevSize.filter((el1) => el1 !== el)
          : [...prevSize, el]
      );
    }}
    style={{backgroundColor:el}}
    className={`border-2 border-slate-300 rounded-full p-0 m-0 h-[30px] w-[30px] ${Array.from(color).includes(el) ? 'outline-double outline-2 outline-offset-2 outline-blue-700' : ''}`}
    icon={<FontAwesomeIcon icon={faPlus} />}
  >
    
  </div>
))}
      </div>
    </div>
  );
};

export default Size;