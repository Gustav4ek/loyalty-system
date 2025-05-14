const SeatSelection = ({ trainId, onClose }) => {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [seats, setSeats] = useState([
      { number: 1, type: 'Сидячий', price: 11.77, status: 'free' },
      { number: 2, type: 'Сидячий', price: 11.77, status: 'occupied' },
      // ... больше мест
    ]);
  
    const handleSeatClick = (seat) => {
      if (seat.status !== 'free') return;
      
      setSelectedSeats(prev => 
        prev.includes(seat.number) 
          ? prev.filter(n => n !== seat.number) 
          : [...prev, seat.number]
      );
    };
  
    // const confirmSelection = async () => {
    //   try {
    //     const response = await axios.post('/api/reserve', {
    //       trainId,
    //       seats: selectedSeats
    //     });
        
    //     if (response.data.success) {
    //       onClose();
    //     }
    //   } catch (error) {
    //     console.error('Ошибка бронирования:', error);
    //   }
    // };
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl p-6 max-w-2xl w-full">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Выбор мест</h3>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
  
          <div className="grid grid-cols-4 gap-2 mb-4">
            {seats.map(seat => (
              <button
                key={seat.number}
                onClick={() => handleSeatClick(seat)}
                className={`p-2 rounded-md text-sm
                  ${seat.status === 'occupied' ? 'bg-gray-300 cursor-not-allowed' 
                   : selectedSeats.includes(seat.number) ? 'bg-blue-500 text-white' 
                   : 'bg-gray-100 hover:bg-gray-200'}`}
                disabled={seat.status === 'occupied'}
              >
                Место {seat.number}
                <div className="text-xs">{seat.price}вгм</div>
              </button>
            ))}
          </div>
  
          <div className="border-t pt-4">
            <div className="flex justify-between items-center">
              <div>
                Выбрано мест: {selectedSeats.length}
                {selectedSeats.length > 0 && (
                  <span className="ml-2">
                    ({selectedSeats.join(', ')})
                  </span>
                )}
              </div>
              <button
                onClick={confirmSelection}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                disabled={selectedSeats.length === 0}
              >
                Подтвердить выбор
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };