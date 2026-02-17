import {useEffect,useState} from 'react'
 
 
const ReactUseEffect = () => {
    const [count, setCount] = useState(0);
    const [calculate, setCalculate] = useState(0);
    useEffect(()=>{ setCalculate(() => count * 2);},[count])
    return (
        <>
            <p>The use effect hooks is used for handling  side effects in  functional components </p>
            <p>A side effect is an operation, that effect something outside the scope of a function.
                in react side effect are manage using hooks like useeffect.
 
                {/* e.g
                let count =0;
                function increment(){
                    count+=1 //Modifies on external variables
                }
                increment()
                console.log(count) //1 */}
            </p>
            <p>Fetching data as a side effect:
                when you fetch data in react components, you are performing a side effect because,
                External interaction: you are interacting as on external data source such as API or a server
                state update:the fetched data will usually update the compnent state,causing a re-render.
                others...
                . subscribing or unsubscring from a service
                . updating the browser dom
                . logging data to the console
               
            </p>
            {/* syntax:
            useEffect(()=>{
                side effect code here
                return ()=>{ //cleanup function
                cleanup code here (optional)
                    }
                },[dependencie])
 
                👉initial rendering:when the components mount,useEffect can run its effect
                function to perform operations like data fetching
 
               👉 Dependencies:The second arguments, an array of dependencies, which determines when the effect
                should re-run,if any value in this array changes, the effect will re-run
 
             */}
            <p>count :{count}</p>
            <button onClick={()=>setCount((c)=>c+1)}>Click</button>
            <p>calculation ({count} * 2) : {calculate}</p>
        </>
    )
}
// const ReactUseEffect = () => {
//     const [count, setCount] = useState(0)
//     useEffect(() => {
//         setTimeout(() => {
//            setCount((count)=>count+1)
//         },1000)
//     })
//   return (
//     <>i have rendered {count} times </>
//   )
// }
export const UseEffectHook = () => {
    useEffect(() => {
        console.log("Hello USeEffect rendered")
    }, []) //first render whith dependencies empty array if we not give depencies then also render first time
    //}) //also work with no dependencie
    return <h1>Hello UseEffect</h1>
}
export const UseEffectWithCounter = () => {
    const [counter, setCounter] = useState(0);
    useEffect(() => {
        console.log("Counter", counter);
    },[counter])
    return (
        <>
            <h1>use Effect Counter:</h1>
            <p>{counter}</p>
            <button onClick={()=>setCounter(counter+1)}>Count</button>
        </>
    )
}
export const UseEffectDate = () => {
    const [date, setDate] = useState();
    useEffect(() => {
 
        setInterval(() => {
            let updateDate = new Date();
           
            setDate(updateDate.toLocaleTimeString())
        },1000)
    },[])
    return (
        <>
            <h1>Date:  {date} </h1>
        </>
    )
}
export const UseEffectChallenge = () => {
    const [counterc, setCounterc] = useState(0);
    const [name, setName] = useState("");
    // console.log("my name",name);
    useEffect(() => {
        document.title=`count: ${counterc}`
    },[counterc])
    useEffect(() => {
        console.log(name)
    },[name])
    return (
        <><h1>Challenge</h1>
            <p>counter:{counterc}</p>
            <button onClick={() => setCounterc(counterc + 1)}>counter</button>
            <p>Name:{name} </p>
            <input type="text" value={name} onChange={(e)=>setName(e.target.value)} />
        </>
       
    )
 
}
export default ReactUseEffect
 