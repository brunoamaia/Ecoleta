import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer } from 'react-leaflet'
import axios from 'axios';
import api from '../../services/api'    //Conexão com o Backend

import './styles.css';

import logo from '../../assets/logo.svg';

interface Item {
    id: number;
    title: string;
    image_url: string;
}

interface IBGEUFResponse {
    id: number;
    sigla: string;
}

const CreatePoint = () => {
    const [items, setItems] = useState<Item[]>([]);
    useEffect(()=>{     // Carregar as classes de itens coletáveis (carrega apenas uma vez)
        api.get('items').then(response => {
            setItems(response.data);
        });
    },[]);

    const [ufs, setUfs] = useState<IBGEUFResponse[]>([]);
    useEffect(() => {   // Carregar a lista de Estados (carrega apenas uma vez)
        axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome').then(response => {
            setUfs(response.data);
        });
    },[]);

    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta"/>

                <Link to="/">
                    <FiArrowLeft/>  Voltar para Home
                </Link>
            </header>

            <form>
                <h1>Cadastro do <br/> ponto de coleta</h1>

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor=""></label>
                        <input 
                            type="text"
                            name="name"
                            id = "name"
                        />
                    </div>

                    <div className="field">
                        <label htmlFor="">Nome da entidade</label>
                        <input 
                            type="text"
                            name="name"
                            id = "name"
                        />
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input
                                type="text"
                                name="whatsapp"
                                id="whatsapp"
                            />
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>

                    <Map center={[-18.1654007, -47.9393512]} zoom={15}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        
                    </Map>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">Estado (UF)</label>
                            <select name="uf" id="uf">
                                <option value="0">Selecione um Estado</option>
                                {ufs.map(uf => (
                                    <option key={uf.id} value={uf.id}>{uf.sigla}</option>
                                ))}
                            </select>
                        </div>

                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select name="city" id="city">
                                <option value="0">Selecione uma cidade</option>
                            </select>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Ítens de coleta</h2>
                        <span>Selecione um ou mais intens abaixo</span>
                    </legend>

                    <ul className="items-grid">
                        {items.map(item => (
                            <li key={item.id}>
                                <img src={item.image_url} alt={item.title} />
                                <span>{item.title}</span>
                            </li>
                        ))}
                        
                    </ul>
                </fieldset>

                <button type="submit">
                    Cadastrar ponto de coleta
                </button>

            </form>
        </div>
    );
} 

export default CreatePoint;