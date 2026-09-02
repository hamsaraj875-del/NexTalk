const ErrorMessage=({message})=>{
  return(
    <>
   <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 m-2 py-3 text-center text-sm text-red-400">
      {message}
    </div>
    </>
  )
}

export default ErrorMessage;