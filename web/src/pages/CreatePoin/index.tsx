import React, {useEffect, useState, ChangeEvent, FormEvent} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, Marker, TileLayer } from 'react-leaflet'
import { LeafletMouseEvent } from 'leaflet';
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
    id: string;
    sigla: string;
}

interface IBGECityResponse {
    nome: string;
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

    const [initialPosition, setinitialPosition] = useState<[number, number]>([0, 0]); // Posição Geográfica atual do Navegador
    useEffect (() => {
        navigator.geolocation.getCurrentPosition(position => {
            const {latitude, longitude } = position.coords;
            setinitialPosition([latitude, longitude]);
        })
    })

    const history = useHistory();       // Pegar o histórico de janela/aba

    const [selectedUf, setSelectedUf] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');
    const [cities, setCities] = useState<string[]>([]);
    useEffect(() => {   //Carregar as Cidades toda vez que mudar o Estado selecionado (setSelectedUf)
        console.log(selectedUf);
        if (selectedUf === '0') {
            return;
        }

        axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios?orderBy=nome`)
        .then(response => {
            const cityNames = response.data.map(city => city.nome);
            setCities(cityNames);
        });
    },[selectedUf])
            // Função para atualizar a lista de cidades
    function handleSelectUF(event: ChangeEvent<HTMLSelectElement>) {
        const uf = event.target.value;
        setSelectedUf(uf);
    }
            // Função para atualizar a cidade Selecionada
    function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
        const city = event.target.value;
        setSelectedCity(city);
    }

    // Pegar a posição que o usuário clicou
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]); //Array
    function handleMapClick(event: LeafletMouseEvent) {
        setSelectedPosition([
            event.latlng.lat,
            event.latlng.lng
        ])
    }

    //Pegar os dados digitados pelo usuário
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
    })
    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value} = event.target;
        setFormData({ ...formData, [name]: value})  // recebe os valores antigos, depois subistitui apenas o campo modificado
    }

    // Pegar as categorias selecionadas
    const [selectedItems, setSelectedItems] = useState<number[]>([]); //Array
    function handleSelectItem(id: number) {
        const alreadySelected = selectedItems.findIndex( item => item === id);
        if (alreadySelected >= 0) {
            const filteredItems = selectedItems.filter(item => item !== id);
            setSelectedItems(filteredItems);
        } else {
            setSelectedItems([...selectedItems, id]);
        }
    }

    // Submeter os dados para o Backend
    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const {name, email, whatsapp } = formData;
        const uf = selectedUf;  // precisa arrumar {id, sigla } = selectedUf;
        const city = selectedCity;
        const [latitude, longitude] = selectedPosition;
        const items = selectedItems;

        const data = {
            name,
            email,
            whatsapp,
            uf,
            city,
            latitude,
            longitude,
            items
        }

        console.log(data)
        await api.post('points', data);
        alert('Ponto de coleta Criado');
        history.push('/');  // Direciona o usuário para a HOME
    }

    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta"/>

                <Link to="/">
                    <FiArrowLeft/>  Voltar para Home
                </Link>
            </header>

            <form onSubmit={handleSubmit}>
                <h1>Cadastro do <br/> ponto de coleta</h1>

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="">Nome da entidade</label>
                        <input 
                            type="text"
                            name="name"
                            id = "name"
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input
                                type="text"
                                name="whatsapp"
                                id="whatsapp"
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço no mapa</span>
                    </legend>

                    <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
                        <TileLayer
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={selectedPosition}></Marker>
                    </Map>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">Estado (UF)</label>
                            <select name="uf" id="uf" value={selectedUf} onChange={handleSelectUF}>
                                <option value="0">Selecione um Estado</option>
                                {ufs.map(uf => (
                                    <option key={uf.id} value={uf.id}>{uf.sigla}</option>
                                ))}
                            </select>
                        </div>

                        <div className="field">
                            <label htmlFor="city">Cidade</label>
                            <select name="city" id="city" value={selectedCity} onChange={handleSelectCity}>
                                <option value="0">Selecione uma cidade</option>
                                {cities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
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
                            <li key={item.id} onClick={() => handleSelectItem(item.id)}
                                className={selectedItems.includes(item.id) ? 'selected' : ''}
                            >
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