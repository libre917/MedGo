"use client";



export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        
        <div className="mb-8 flex justify-center">
        
            <img
              src="MEDGO_logo.png"
              alt="Logo MEDGO"
              className="h-25 sm:h-25 w-auto object-contain transition-transform hover:scale-105"
            />
     
        </div>
        
       
        <div >
          <div className="flex justify-center mb-5">
            <div className="text-6xl font-bold text-blue-900">404</div>
          </div>
          
          <h2 className="text-4xl font-bold text-gray-800 mb-1">Página não encontrada</h2>
          
          <p className="text-gray-900">
            A página que você está procurando não existe ou foi movida.
          </p>
        </div>
        
        
        
      </div>
    </div>
  );
}