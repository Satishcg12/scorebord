import { WebviewWindow } from "@tauri-apps/api/window"
import useKataScoreStore from "../store/KataScoreStore"
import LeftArrow from "../assets/icons/arrow-left-svgrepo-com.svg"
import MaximizeIcon from "../assets/icons/maximize-solid.svg"
import CloseIcon from "../assets/icons/xmark-solid.svg"
import { useNavigate } from "react-router-dom"
import Button from "../components/Button"

const KATAScoreBoardController = () => {
  const navigate = useNavigate()
  const {
    name,
    setName,
    aka,
    toggleAka,
    division,
    setDivision,
    kata,
    setKata,
    numberOfJudges,
    setNumberOfJudges,
    tatami,
    setTatami,
    scores,
    setScores,
    reset,
    largestScoreIndex,
    smallestScoreIndex,
    showScores,
    toggleShowScores,
    category,
    setCategory,
    timer,
    setTimer,
    startTimer,
    stopTimer,
    isTimerRunning

  } = useKataScoreStore((state) => state)

  const openWindow = () => {
    const new_window = new WebviewWindow("kata-scoreboard", {
      url: '/kata-scoreboard',
      title: "Kata Scoreboard",
      fullscreen: true,
      resizable: true,
      center: true
    });
    new_window.once("tauri://error", (event) => {
      window.alert(event.payload);
    });
  }
  const isWindowOpen = () => {
    const appWindow = WebviewWindow.getByLabel("kata-scoreboard");
    if (appWindow === null) {
      return false;
    }
    else {
      return true;
    }
  }
  const closeWindow = () => {
    const appWindow = WebviewWindow.getByLabel("kata-scoreboard");
    if (appWindow === null) {
      window.alert("Scoreboard not found please reopen it");
    }
    else {
      appWindow.close();
    }
  }

  return (
    <div className='h-screen w-screen bg-black text-white relative grid grid-cols-2'>
      {showScores && <div className="h-full w-full absolute top-0 left-0 bg-[#000000aa] z-30 text-5xl font-digital-display flex flex-col gap-4 justify-center items-center">
        <span>

          You are currently showing scores
        </span>
        <button className="bg-blue-500 hover:bg-blue-700 text-white text-2xl  py-2 px-4 rounded" onClick={() => { toggleShowScores() }}>
          Hide Score
        </button>
      </div>}
      <div className=" bg-gray-800 rounded-lg p-5 h-screen">

        <div className="grid grid-cols-2">

          <div className="flex flex-col text-xl p-2">

            <label className="font-semibold py-2" htmlFor="name">Name</label>
            <input type="text" name="name" id="name"
              className="bg-black text-white text-center border-2 border-white rounded-lg p-2"
              value={name}
              onChange={(e) => { setName(e.target.value) }}
            />
          </div>

          <div className="flex flex-col text-xl p-2">

            <label className="font-semibold py-2" htmlFor="aka">Player</label>
            <select name="aka" id="aka" className="bg-black text-white text-center border-2 border-white rounded-lg p-2" value={aka ? "true" : "false"} onChange={() => { toggleAka() }}>
              <option value="true">aka</option>
              <option value="false">ao</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="flex flex-col text-xl p-2">
            <label className="font-semibold py-2" htmlFor="category">Category</label>
            <input type="text" name="category" id="category"
              className="bg-black text-white text-center border-2 border-white rounded-lg p-2"
              value={category}
              onChange={(e) => { setCategory(e.target.value) }}
            />
          </div>

          <div className="flex flex-col text-xl p-2">

            <label className="font-semibold py-2" htmlFor="division">Division</label>
            <input type="text" name="division" id="division"
              className="bg-black text-white text-center border-2 border-white rounded-lg p-2"
              value={division}
              onChange={(e) => { setDivision(e.target.value) }}
            />
          </div>
        </div>
        <div className="grid grid-cols-2">

          <div className="flex flex-col text-xl p-2">

            <label className="font-semibold py-2" htmlFor="kata">Kata</label>
            <select name="kata" id="kata" value={kata} onChange={(e) => { setKata(e.target.value) }} className="bg-black text-white text-center border-2 border-white rounded-lg p-2">
              <option value="1-Anan">1-Anan</option>
              <option value="2-Anan Dai">2-Anan Dai</option>
              <option value="3-Ananko">3-Ananko</option>
              <option value="4-Aoyagi">4-Aoyagi</option>
              <option value="5-Bassai">5-Bassai</option>
              <option value="6-Bassai Dai">6-Bassai Dai</option>
              <option value="7-Bassai Sho">7-Bassai Sho</option>
              <option value="8-Chatanyara Kushanko">8-Chatanyara Kushanko</option>
              <option value="9-Chatanyara No Kushanko">9-Chatanyara No Kushanko</option>
              <option value="10-Chinte">10-Chinte</option>
              <option value="11-Chinto">11-Chinto</option>
              <option value="12-Enpi">12-Enpi</option>
              <option value="13-Fukyugata Ichi">13-Fukyugata Ichi</option>
              <option value="14-Fukyugata Ni">14-Fukyugata Ni</option>
              <option value="15-Gankaku">15-Gankaku</option>
              <option value="16-Garyu">16-Garyu</option>
              <option value="17-Gekisai (Geksai) 1">17-Gekisai (Geksai) 1</option>
              <option value="18-Gekisai (Geksai) 2">18-Gekisai (Geksai) 2</option>
              <option value="19-Gojushiho">19-Gojushiho</option>
              <option value="20-Gojushiho Dai">20-Gojushiho Dai</option>
              <option value="21-Gojushiho Sho">21-Gojushiho Sho</option>
              <option value="22-Hakucho">22-Hakucho</option>
              <option value="23-Hangetsu">23-Hangetsu</option>
              <option value="24-Haufa (Haffa)">24-Haufa (Haffa)</option>
              <option value="25-Heian Shodan">25-Heian Shodan</option>
              <option value="26-Heian Nidan">26-Heian Nidan</option>
              <option value="27-Heian Sandan">27-Heian Sandan</option>
              <option value="28-Heian Yodan">28-Heian Yodan</option>
              <option value="29-Heian Godan">29-Heian Godan</option>
              <option value="30-Heiku">30-Heiku</option>
              <option value="31-Ishimine Bassai">31-Ishimine Bassai</option>
              <option value="32-Itosu Rohai Shodan">32-Itosu Rohai Shodan</option>
              <option value="33-Itosu Rohai Nidan ">33-Itosu Rohai Nidan </option>
              <option value="34-Itosu Rohai Sandan">34-Itosu Rohai Sandan</option>
              <option value="35-Jiin">35-Jiin</option>
              <option value="36-Jion">36-Jion</option>
              <option value="37-Jitte">37-Jitte</option>
              <option value="38-Juroku">38-Juroku</option>
              <option value="39-Kanchin">39-Kanchin</option>
              <option value="40-Kanku Dai">40-Kanku Dai</option>
              <option value="41-Kanku Sho">41-Kanku Sho</option>
              <option value="42-Kanshu">42-Kanshu</option>
              <option value="43-Kishimoto No Kushanku">43-Kishimoto No Kushanku</option>
              <option value="44-Kousoukun">44-Kousoukun</option>
              <option value="45-Kousoukun Dai">45-Kousoukun Dai</option>
              <option value="46-Kousoukun Sho">46-Kousoukun Sho</option>
              <option value="47-Kururunfa">47-Kururunfa</option>
              <option value="48-Kusanku">48-Kusanku</option>
              <option value="49-Kyan No Chinto">49-Kyan No Chinto</option>
              <option value="50-Kyan No Wanshu">50-Kyan No Wanshu</option>
              <option value="51-Matsukaze">51-Matsukaze</option>
              <option value="52-Matsumura Bassai">52-Matsumura Bassai</option>
              <option value="53-Matsumura Rohai">53-Matsumura Rohai</option>
              <option value="54-Meikyo">54-Meikyo</option>
              <option value="55-Myojo">55-Myojo</option>
              <option value="56-Naifanchin Shodan">56-Naifanchin Shodan</option>
              <option value="57-Naifanchin Nidan">57-Naifanchin Nidan</option>
              <option value="58-Naifanchin Sandan">58-Naifanchin Sandan</option>
              <option value="59-Naihanchi">59-Naihanchi</option>
              <option value="60-Nijushiho">60-Nijushiho</option>
              <option value="61-Nipaipo">61-Nipaipo</option>
              <option value="62-Niseishi">62-Niseishi</option>
              <option value="63-Ohan">63-Ohan</option>
              <option value="64-Ohan Dai">64-Ohan Dai</option>
              <option value="65-Oyadomari No Passai">65-Oyadomari No Passai</option>
              <option value="66-Pachu">66-Pachu</option>
              <option value="67-Paiku">67-Paiku</option>
              <option value="68-Papuren">68-Papuren</option>
              <option value="69-Passai">69-Passai</option>
              <option value="70-Pinan Shodan">70-Pinan Shodan</option>
              <option value="71-Pinan Nidan">71-Pinan Nidan</option>
              <option value="72-Pinan Sandan">72-Pinan Sandan</option>
              <option value="73-Pinan Yodan">73-Pinan Yodan</option>
              <option value="74-Pinan Godan">74-Pinan Godan</option>
              <option value="75-Rohai">75-Rohai</option>
              <option value="76-Saifa">76-Saifa</option>
              <option value="77-Sanchin">77-Sanchin</option>
              <option value="78-Sansai">78-Sansai</option>
              <option value="79-Sanseiru">79-Sanseiru</option>
              <option value="80-Sanseru">80-Sanseru</option>
              <option value="81-Seichin">81-Seichin</option>
              <option value="82-Seienchin (Seiyunchin)">82-Seienchin (Seiyunchin)</option>
              <option value="83-Seipai">83-Seipai</option>
              <option value="84-Seiryu">84-Seiryu</option>
              <option value="85-Seishan">85-Seishan</option>
              <option value="86-Seisan (Sesan)">86-Seisan (Sesan)</option>
              <option value="87-Shiho Kousoukun">87-Shiho Kousoukun</option>
              <option value="88-Shinpa">88-Shinpa</option>
              <option value="89-Shinsei">89-Shinsei</option>
              <option value="90-Shisochin">90-Shisochin</option>
              <option value="91-Sochin">91-Sochin</option>
              <option value="92-Suparinpei">92-Suparinpei</option>
              <option value="93-Tekki Shodan">93-Tekki Shodan</option>
              <option value="94-Tekki Nidan">94-Tekki Nidan</option>
              <option value="95-Tekki Sandan">95-Tekki Sandan</option>
              <option value="96-Tensho">96-Tensho</option>
              <option value="97-Tomari Bassai">97-Tomari Bassai</option>
              <option value="98-Unshu">98-Unshu</option>
              <option value="99-Unsu">99-Unsu</option>
              <option value="100-Useishi">100-Useishi</option>
              <option value="101-Wankan">101-Wankan</option>
              <option value="102-Wanshu">102-Wanshu</option>
            </select>
          </div>
          <div className="flex flex-col text-xl p-2">

            <label className="font-semibold py-2" htmlFor="numberOfJudges">Number of Judges</label>
            <select name="numberOfJudges" id="numberOfJudges" value={numberOfJudges} onChange={(e) => { setNumberOfJudges(parseInt(e.target.value) as 3 | 5 | 7) }} className="bg-black text-white text-center border-2 border-white rounded-lg p-2">
              <option value="3">3</option>
              <option value="5">5</option>
              <option value="7">7</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2">

          <div className="flex flex-col text-xl p-2">

            <label className="font-semibold py-2" htmlFor="tatami">Tatami</label>
            <input type="text" name="tatami" id="tatami"
              className="bg-black text-white text-center border-2 border-white rounded-lg p-2"
              value={tatami}
              onChange={(e) => { setTatami(e.target.value) }}
            />
          </div>
          <div className="grid grid-rows-2 place-items-center">

            <input type="number" min={0}
              className="  bg-black text-white text-center border-2 border-white rounded-lg p-2 mx-auto"
              value={timer}
              onChange={(e) => { setTimer(parseInt(e.target.value)) }}
              disabled={isTimerRunning}
            />
            <div className="grid grid-flow-col gap-2">
              <Button onClick={() => {
                isTimerRunning ? stopTimer() : startTimer()
              }} color="border">
                {isTimerRunning ? "Stop" : "Start"}
              </Button>
              <Button onClick={() => {
                setTimer(0)
                stopTimer()
              }} color="border">
                Reset
              </Button>
              <Button onClick={() => {
                setTimer(6 * 60)
              }} color="border">
                6 min
              </Button>
              <Button onClick={() => {
                setTimer(5 * 60)
              }} color="border">
                5 min
              </Button>


            </div>
          </div>
        </div>
        <div className="flex flex-col text-xl p-2">
          <label className="font-semibold py-2" htmlFor="scores">Scores</label>
          <div className="grid grid-cols-5 gap-4">

            {
              scores.map((score, index) => {
                return (
                  <div className="flex flex-col" key={index}>
                    <label className="">Judge {index + 1}</label>
                    <input type="number" name="scores" id="scores" key={index}
                      className={`bg-black text-white text-center border-2 border-white rounded-lg p-2 ${numberOfJudges == 3 ? "" : largestScoreIndex === index ? 'bg-green-500' : smallestScoreIndex === index ? 'bg-red-500' : ''}`}
                      value={score}
                      onChange={(e) => { setScores(index, parseFloat(e.target.value)) }}
                      max={10}
                      min={5}
                      step={0.1}
                    />
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className="grid grid-flow-col gap-3 text-xl p-2">

          <Button onClick={() => { toggleShowScores() }} color="border">
            {showScores ? "Hide Scores" : "Show Scores"}
          </Button>

          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => { reset() }}>Reset</button>
        </div>
        <div className="grid grid-flow-col place-items-center mt-3 bg-gray-300  rounded-lg p-2 ">
          <button onClick={() => {
            isWindowOpen() && closeWindow()
            navigate('/')
          }}>
            <img src={LeftArrow} alt="go back" className="h-14 w-h-14" />
          </button>
          <button onClick={() => { openWindow() }}>
            <img src={MaximizeIcon} alt="maximize icon" className=" h-14 w-14" />
          </button>
          <button onClick={() => { closeWindow() }}>
            <img src={CloseIcon} alt="close icon"  className=" h-14 w-14" />
          </button>

        </div>
      </div>
      <div className="overflow-scroll">
        <iframe src="/kata-scoreboard" className="h-screen w-full"></iframe>
      </div>
    </div>
  )
}

export default KATAScoreBoardController