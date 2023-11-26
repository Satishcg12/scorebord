import { listen } from '@tauri-apps/api/event';
import usePlayerStore from '../store/Player';
import Button from '../components/Button';
import useTimerStore from '../store/Timer';

const Scoreboard = () => {
  const { name1, name2,reset, setName1, setName2, addIppon1, addIppon2, addWazaari1, addWazaari2, addYuko1, addYuko2, subtract1, subtract2, penalty1, penalty2, score1, score2, s1, s2 } = usePlayerStore((state) =>  state);
  console.table({ name1, name2, score1, score2, penalty1, penalty2, s1, s2 })
  const { m, s } = useTimerStore((state) => state);

  const penaltys = ["C1", "C2", "C3", "HC"]

  type changeName = {
    player: 1 | 2,
    name: string
  }
  type score = {
    player: 1 | 2,
  }

  listen("resetAll", () => {
    reset();
  })


  
  listen('changeName', ({ payload }: { payload: changeName }) => {

    if (payload.player === 1) {
      setName1(payload.name);
    } else {
      setName2(payload.name);
    }

  });
   listen('addIppon', ({ payload }: { payload: score }) => {
    if (payload.player === 1) {
      addIppon1();
    } else {
      addIppon2();
    }

  });
  listen('addWazaari', ({ payload }: { payload: score }) => {
    if (payload.player === 1) {
      addWazaari1();
    } else {
      addWazaari2();
    }

  });
  listen('addYuko', ({ payload }: { payload: score }) => {
    if (payload.player === 1) {
      addYuko1();
    } else {
      addYuko2();
    }

  });
  listen('subtract', ({ payload }: { payload: score }) => {
    if (payload.player === 1) {
      subtract1();
    } else {
      subtract2();
    }

  });

  return (
    <div className='h-screen w-screen bg-black text-white text-5xl flex flex-col'>
      <div className='grid grid-cols-2 p-2 gap-2 h-4/6'>
        <div className='bg-red-600 grid grid-cols-3 grid-rows-4 rounded-lg p-2 gap-2'>
          <div className='col-span-2 row-span-1 grid grid-rows-2 grid-cols-1 itemc'>
            <label htmlFor="name1">AKA</label>
            <p>{name1}</p>
            
          </div>
          <div className='col-span-2 row-span-3 rounded-lg relative grid place-items-center bg-black'>
            <button className={`absolute top-5 left-5 border-2 rounded-full aspect-square h-24 grid place-items-center 
            ${s1 ? "bg-green-500" : "bg-black"
              } `}

            >S</button>
            <span className='text-[15rem] font-digital-display'>{score1}</span>
          </div>
        </div>
        <div className='bg-blue-600 grid grid-cols-3 grid-rows-4 rounded-lg p-2 gap-2'>
          
          <div className='col-span-2 row-span-1 grid grid-rows-2 grid-cols-1 itemc'>
            <label htmlFor="name1">AKA</label>
            <p>{name2}</p>

          </div>
          <div className='col-span-2 row-span-3 rounded-lg relative grid place-items-center bg-black'>
            <button className={`absolute top-5 left-5 border-2 rounded-full aspect-square h-24 grid place-items-center
            ${s2 ? "bg-green-500" : "bg-black"
              } `}
            >S</button>
            <span className='text-[15rem] font-digital-display'>{score2}</span>
          </div>
        </div>

      </div>
      <div className=' grid grid-cols-3 grid-rows-1 h-2/6 p-2 gap-2 grid-flow-col'>
        <div className="bg-yellow-400 rounded-lg grid grid-cols-3 grid-rows-2 gap-2 p-2">
          {
            penaltys.map((penalty, index) => {
              return (
                <Button
                  key={index}
                  onClick={() => {
                    return;
                  }}
                  active={penalty2 >= index}

                  color="black" >
                  {penalty}
                </Button>
              )
            })
          }
          <button className={`bg-black rounded`}>H</button>
          <button className={`bg-black rounded`}>S</button>
        </div>
        <div className="bg-yellow-400 rounded-lg grid grid-cols-1 grid-rows-4">
          {/* timer */}
          <div className='row-span-3 '>
            <span className='text-9xl text-black font-digital-display'>{m}:{s}</span>

          </div>
        </div>
        <div className="bg-yellow-400 rounded-lg grid grid-cols-3 grid-rows-2 gap-2 p-2">
          {penaltys.map((penalty, index) => {
            return (
              <Button
                key={index}
                onClick={() => { return; }}
                active={penalty1 >= index}

                color="black" >
                {penalty}
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Scoreboard