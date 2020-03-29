import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';
import api from '../../services/api';

import "./styles.css";

import logoImg from "../../assets/logo.svg";

function Profile() {
  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');

  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    async function loadIncidents() {
      const res = await api.get('profile', {
        headers: {
          Authorization: ongId
        }
      });
      setIncidents(res.data);
    }
    loadIncidents();
  }, [ongId]);

  const incidentsEl = incidents.map(incident => {
    return (
      <li key={incident.id}>
        <strong>CASO:</strong>
        <p>{incident.title}</p>

        <strong>DESCRIÇÃO:</strong>
        <p>{incident.description}</p>

        <strong>Valor:</strong>
        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

        <button type="button">
          <FiTrash2 size={20} color="#a8a8b3"/>
        </button>
      </li>
    );
  });

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>Bem vinda, {ongName}</span>
        
        <Link className="button" to="/incidents/new">Cadastrar Novo Caso</Link>
        <button type="button">
          <FiPower size={18} color="#E02041"/>
        </button>
      </header>

      <h1>Casos cadastrados</h1>

      <ul>
        {incidentsEl}
      </ul>
    </div>
  );
}

export default Profile;
