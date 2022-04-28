import { FormEvent, useState} from "react";
import Modal from "react-modal"

import closeImg from "../../assets/close.svg"
import incomeImg from "../../assets/income.svg"
import outcomeImg from "../../assets/outcome.svg"

import { useTransactions } from "../../hooks/useTransactions";
import { Container, RadioBox, TransactionTypeContainer } from "./styles";


interface NewTransactionModalProps {
  isOpen: boolean; //modal aberto ou fechado = false ou true
  onRequestClose: () => void;
}

export function NewTransactionModal({isOpen, onRequestClose} : NewTransactionModalProps) {
  const { createTransaction } = useTransactions();
  
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(0)
  const [category, setCategory] = useState('')
  const [type, setType] = useState('deposity')

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

   await createTransaction({
      title,
      amount,
      category,
      type
    })

    setTitle('')
    setAmount(0)
    setCategory('')
    setType('deposity')
    onRequestClose();
  }

  return(
    <Modal 
    isOpen={isOpen} //função que ira abrir o modal
    onRequestClose={onRequestClose} //permite fechar o modal apertando 'esc' ou clicando do lado de fora do modal
    overlayClassName="react-modal-overlay"
    className="react-modal-content"
    >

    <button 
      type="button" 
      onClick={onRequestClose} 
      className="react-modal-close"
    >
      <img src={closeImg} alt="Fechar modal"  />
    </button>
    
    <Container onSubmit={handleCreateNewTransaction}> 
      <h2>Cadastrar transação</h2>

      <input 
        placeholder="Título"
        value={title}
        onChange={event => setTitle(event.target.value)}
      />

      <input 
        type="number" 
        placeholder="Valor"
        value={amount}
        onChange={event => setAmount(Number(event.target.value))}
      />

      <TransactionTypeContainer>
          <RadioBox
            type="button" 
            onClick={() => { setType('deposity') }}
            isActive={type === 'deposity'}
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>

          <RadioBox
            type="button"
            onClick={() => { setType('withdraw') }}
            isActive={type === 'withdraw'}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
      </TransactionTypeContainer>

      <input 
        placeholder="Categoria" 
        value={category}
        onChange={event => setCategory(event.target.value)}
      />

      <button 
        type="submit"
      >
          Cadastrar
      </button>

    </Container>
  </Modal>
  );
}