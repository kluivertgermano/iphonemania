import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { AgGridReact } from 'ag-grid-react';
import Modal from 'react-modal';
import { FaHome, FaCreditCard, FaLock, FaUser } from 'react-icons/fa';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const columns = [
  { field: 'receiptNo'},
  { field: 'outlet'},
  { field: 'cashier'},
  { field: 'promoter'},
  { field: 'quantity'},
  { field: 'selling_price'},
  { field: 'renevue'},
  { field: 'discount_amount'}
];

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width:'50%'
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');


function App() {

  const [rows,  setRows] = useState([])
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [dados, setDados] = useState({});
  
  useEffect(()=>{

    async function fetchAxios(){
      const {data} = await axios('https://iphonemania.herokuapp.com/')
      setRows(data)
    }

    fetchAxios()

  },[])

  function openModal(dados) {
    setIsOpen(true);
    setDados(dados);
    console.log(dados)
  }

  // function afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  //   subtitle.style.color = '#f00';
  // }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="flex m-0">
      <div className="w-1/5 text-1xl h-screen bg-slate-900 text-white flex  flex-col pt-5 pl-5">
        <div className="text-3xl font-bold text-center mb-5">LOGO</div>
        <div className="flex items-center cursor-pointer"><FaHome/> &nbsp;&nbsp;Dashboard</div>
        <div className="flex items-center cursor-pointer"><FaCreditCard/> &nbsp;&nbsp;Enviar a AGT</div>
        <div className="flex items-center cursor-pointer"><FaLock/> &nbsp;&nbsp;Sair</div>
      </div>

      <div  className="flex flex-col border w-4/5">
          
          <div className=" flex justify-between items-center mb-5 mt-5 px-5">
            
              {Array(4).fill(0).map(ele => (
                <div className="bg-white p-5 w-1/5 shadow">
                  <div className="flex justify-between mb-2">
                    <div className=""><FaUser size={50}/></div>
                    <div className="font-bold">{Math.round(Math.random() * 9000)}</div>
                  </div>
                  <div className="text-xs">Informação</div>
                </div>
              ))}
              
            
          </div>

          <div className=" flex justify-center items-center">
            
            <div className="bg-white shadow p-5 ag-theme-alpine" style={{height: 500, width: '95%'}}>
              {/* <p className="text-4xl font-bold">Facturas do mês corrent</p> */}
              <AgGridReact
                  rowData={rows}
                  columnDefs={columns}
                  pagination={true}
                  paginationPageSize={20}
                  onRowSelected={(evt)=>{alert(evt)}}
                  onPaginationChanged={(evt)=>{console.log(evt.newData)}}
                  onRowClicked={(evt)=>{openModal(evt.data)}}
              />
            </div>
            
          </div>
          
          <Modal
            isOpen={modalIsOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
          >
            <div className="flex w-full flex-col p-3 text-xs">
              <p>Caixa: <span className="font-bold">{dados.cashier}</span></p>
              <p>Id: <span className="font-bold">{dados.receiptNo}</span></p>
              <p>Data: <span className="font-bold">{dados.date}</span></p>
              <p>Loja: <span className="font-bold">{dados.outlet}</span></p>
              <hr className="mt-1"/>
              <div className="flex justify-between bg-gray-100 mb-3 mt-3 p-3 text-base">
                <div>
                  <p>Produto: <span className="font-bold">Faltando</span></p>
                  <p>Preço: <span className="font-bold">{dados.selling_price}</span></p>
                  <p>Quantidade: <span className="font-bold">{dados.quantity}</span></p> 
                  <p>Total: <span className="font-bold">Faltando</span></p>           
                </div>
                <div>
                  <p>Preço liquido: <span className="font-bold">Falatando</span></p>
                  <p>Iva:  <span className="font-bold">14%</span></p>
                  <p>Metodo de pagamento: <span className="font-bold">{dados.payment_tpa || dados.payment_other}</span></p>
                </div>
              </div>
            </div>
            
            <button className='bg-sky-400 p-2 text-white text-xs' onClick={closeModal}>Fechar</button>
          </Modal>
        </div>

    </div>
  );
}

export default App;
