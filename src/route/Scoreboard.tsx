
import usePlayerStore from '../store/Player';
import Button from '../components/Button';
import useTimerStore from '../store/Timer';

const Scoreboard = () => {
  const { name1, name2, penalty1, penalty2, score1, score2, s1, s2,penaltyH1,penaltyH2,penaltyK1,penaltyK2,penaltyS1,penaltyS2 } = usePlayerStore((state) =>  state);
  console.table({ name1, name2, score1, score2, penalty1, penalty2, s1, s2 })
  const { m, s } = useTimerStore((state) => state);

  const penaltys = ["C1", "C2", "C3", "HC"]

  return (
    <div className='h-screen w-screen bg-black text-white text-5xl grid grid-row-3 grid-rows-1 relative'>
      <div className='h-screen w-screen absolute z-50' data-tauri-drag-region ></div>
      <div className='row-span-2 grid grid-cols-2 p-2 gap-2 '>
        <div className='bg-red-600 grid grid-cols-1 grid-rows-4 rounded-lg p-2 gap-2'>
          <div className='flex gap-3 items-center justify-around'> 
            <label htmlFor="name1" className='font-bold'>AKA</label>
            <span>:</span>
            <p className='capitalize font-mono  '>{name1}</p>
            
          </div>
          <div className='col-span-2 row-span-3 rounded-lg relative grid place-items-center bg-black'>
            <button className={`absolute top-5 left-5 border-2 rounded-full aspect-square h-24 grid place-items-center 
            ${s1 ? "bg-red-500" : "bg-black"
              } `}

            >S</button>
            <span className='text-[15rem] font-digital-display'>{score1}</span>
          </div>
        </div>
        <div className='bg-blue-600 grid grid-cols-1 grid-rows-4 rounded-lg p-2 gap-2'>
          
          <div className='flex gap-3 items-center justify-around '>
            <label htmlFor="name1" className='font-bold'>AO</label>
            <span>:</span>
            <p className='font-semibold'>{name2}</p>

          </div>
          <div className='col-span-2 row-span-3 rounded-lg relative grid place-items-center bg-black'>
            <button className={`absolute top-5 left-5 border-2 rounded-full aspect-square h-24 grid place-items-center
            ${s2 ? "bg-blue-500" : "bg-black"
              } `}
            >S</button>
            <span className='text-[15rem] font-digital-display'>{score2}</span>
          </div>
        </div>

      </div>
      <div className='row-span-1 grid grid-cols-3 grid-rows-1 p-2 gap-2 grid-flow-col'>
        <div className="bg-yellow-400 rounded-lg grid grid-cols-3 grid-rows-3 gap-2 p-2">
          {
            penaltys.map((penalty, index) => {
              return (
                <Button
                  key={index+1}
                  onClick={() => {
                    return;
                  }}
                  active={penalty1 >= index+1}

                  color="black" >
                  {penalty}
                </Button>
              )
            })
          }
          <Button 
          onClick={()=>{return;}}
          active={penaltyH1}
          color="black" >
            H
          </Button>
          <Button
            onClick={() => { return; }}
            active={penaltyS1}
            color="black" >
            
            S
          </Button>
          <div className='col-span-3 grid'>

          <Button
            onClick={() => { return; }}
            active={penaltyK1}
            color="black" >
            K
          </Button>

          </div>
          
        </div>
        <div className="bg-yellow-400 rounded-lg grid grid-cols-1 grid-rows-4"   >
          {/* timer */}
          <div className='row-span-3 '>
          <div className='text-9xl text-black font-digital-display  grid grid-cols-3 place-items-center'>
                <span>{m<10 ? "0"+m : m}</span>
                <span>:</span>
                <span>{s<10 ? "0"+s : s}</span>
              </div>

          </div>
        </div>
        <div className="bg-yellow-400 rounded-lg grid grid-cols-3 grid-rows-3 gap-2 p-2">
          {penaltys.map((penalty, index) => {
            return (
              <Button
                key={index+1}
                onClick={() => { return; }}
                active={penalty2 >= index+1}

                color="black" >
                {penalty}
              </Button>
            )
          })}

          <Button
            onClick={() => { return; }}
            active={penaltyH2}
            color="black" >
            H
          </Button>
          <Button
            onClick={() => { return; }}
            active={penaltyS2}
            color="black" >
            S
          </Button>
          <div className='col-span-3 grid'>

            <Button
              onClick={() => { return; }}
              active={penaltyK2}
              color="black" >
              K
            </Button>

            </div>  
        
        </div>
      </div>
    </div>
  )
}

export default Scoreboard