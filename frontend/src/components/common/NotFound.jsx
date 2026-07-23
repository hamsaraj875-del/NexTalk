import {useNavigate} from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const clickHandler=(e)=>{
    e.preventDefault();
    navigate("/auth/login");
  }
  
  return (
    <>
      <div className="w-screen h-screen flex" style={{backgroundImage:"url('notFound.png')",backgroundSize:"cover",backgroundPosition:"center"}} >
        <button onClick={clickHandler} className="fixed right-80 bottom-20 px-4 py-2 bg-transparent border-2 border-purple-500 rounded-xl text-3xl font-mono text-white animate-bounce hover:bg-[#b58eec]" >Return to Galaxy</button>
      </div>
    </>
  );
};
export default NotFound;
