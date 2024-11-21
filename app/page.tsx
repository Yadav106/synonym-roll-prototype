"use client"

import { ChangeEvent, useState } from "react";
import Image from "next/image"

export default function Home() {

  const handleChange = (e: ChangeEvent<HTMLInputElement>, idx: number) => {
    const newInputs = [...inputs];
    newInputs[idx] = e.target.value;
    setInputs(newInputs);
  };

  const handleSubmit = () => {
    let temp_won = true
    inputs.forEach((input, idx) => {
      if (input.toLowerCase() != words[idx].word.toLowerCase()) {
        temp_won = false
      }
    })

    // setWon(temp_won)
    if (temp_won) {
      setNotifText("You Won!!!!!")
    } else {
      setNotifText("Try again")
    }
  }

  const handleHint = () => {
    let idx = 0
    for (idx = 0; idx < inputs.length; idx++) {
      if (inputs[idx].toLowerCase() != words[idx].word.toLowerCase()) {
        let ipword = inputs[idx]
        let expected = words[idx].word

        if (ipword.length > expected.length) {
          ipword = ipword.slice(0, ipword.length-1)
        } else if (ipword.length <= expected.length) {
          let wrong_idx = 0
          for (wrong_idx = 0; wrong_idx < ipword.length; wrong_idx++) {
            if (ipword[wrong_idx] != expected[wrong_idx]) {
              break
            }
          }

          if (wrong_idx == ipword.length) {
            ipword += expected[wrong_idx]
          } else {
            ipword = ipword.slice(0, wrong_idx) + expected[wrong_idx] + ipword.slice(wrong_idx+1)
          }
        }

        const newInputs = [...inputs];
        newInputs[idx] = ipword;
        setInputs(newInputs);
        return
      }
    }
  }

  const handleReveal = () => {
    let idx = 0
    for (idx = 0; idx < inputs.length; idx++) {
      if (inputs[idx].toLowerCase() != words[idx].word.toLowerCase()) {
        const newInputs = [...inputs];
        newInputs[idx] = words[idx].word;
        setInputs(newInputs);
        return
      }
    }
  }

  const words = [
    {
      word: "blunder",
      hint: "no hint"
    },
    {
      word: "wonder",
      hint: "rhymes with word 1"
    },
    {
      word: "wander",
      hint: "change a vowel in word 2"
    },
    {
      word: "roam",
      hint: "synonym of word 3"
    }
  ]

  const [inputs, setInputs] = useState(words.map((w, idx) => {
    if (idx == 0 || idx == words.length - 1) return w.word
    return ""
  }));

  // const [won, setWon] = useState(false)
  const [notifText, setNotifText] = useState("")
  const [hint, setHint] = useState("")

  return (
    <div className="flex flex-col justify-center items-center mt-16">
      <p className="font-bold text-[30px]">
        Synonym Roll Prototype
      </p>

      <div className="flex flex-col gap-5 bg-[#03346E] text-[#E2E2B6] p-5 rounded-md mt-5 font-black text-xl">
        {
          words.map((word, idx) => {
            if ((idx == 0) || (idx == words.length - 1)) {
              return (
                <div className="flex justify-between items-center gap-3">
                  <div key={idx}>
                    {word.word}
                  </div>

                  {
                    idx != 0 &&
                    <Image
                      src="hint.svg"
                      height="40"
                      width="40"
                      alt=""
                      className="cursor-pointer"
                      onClick={() => setHint(words[idx].hint)}
                    />
                  }
                </div>
              )
            }
            return (
              <div className="flex justify-between items-center gap-3">
                <input
                  inputMode="text"
                  value={inputs[idx]}
                  onChange={(e) => handleChange(e, idx)}
                  className="rounded-md h-[5vh] px-2 bg-black text-white"
                />

                <Image
                  src="hint.svg"
                  height="40"
                  width="40"
                  alt=""
                  className="cursor-pointer"
                  onClick={() => setHint(words[idx].hint)}
                />
              </div>
            )
          })
        }
      </div>

      <div className="mt-5 font-extrabold bg-[#03346E] p-3 text-xl text-[#E2E2B6] rounded-md w-[30vw] text-center">
        {
          hint == "" ?
            <p className="flex flex-col lg:flex-row justify-center items-center">
              Click on 
              <Image
                src="hint.svg"
                height="40"
                width="40"
                alt=""
              />
              to get hint
            </p> :
            <div>
              {hint}
            </div>
        }
      </div>

      {/*Button Group for Hint and Reveal Word*/}
      <div className="flex flex-col gap-3 mt-4 w-[30vw] lg:w-[15vw] text-[#03346E] font-semibold">
        <div className="flex flex-col md:flex-row gap-3 w-full">
          <button className="flex justify-center items-center bg-slate-200 hover:bg-slate-400 p-2 rounded-md w-[100%] lg:w-[30%]"
            onClick={() => handleHint()}
          >
            Hint
          </button>

          <button className="flex justify-center items-center bg-slate-200 hover:bg-slate-400 p-2 rounded-md w-[100%] lg:w-[70%]"
            onClick={() => handleReveal()}
          >
            Reveal a Word
          </button>
        </div>
        <button className="flex justify-center items-center bg-slate-200 hover:bg-slate-400 p-2 rounded-md"
          onClick={() => handleSubmit()}
        >
          Submit
        </button>
      </div>

      {
        notifText &&
        <div className="bg-slate-200 mt-4 p-4 rounded-md">
          {notifText}
        </div>
      }
    </div>
  );
}
