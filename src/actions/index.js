import axios from 'axios';

//base url
const ROOT_URL =`http://gd2.mlb.com/components/game/mlb/`;

//http://gd2.mlb.com/components/game/mlb/year_2016/month_10/day_04/master_scoreboard.json


export const FETCH_GAMES = 'FETCH_GAMES';
export const FETCH_GAME = 'FETCH_GAME';
export const FETCH_GAME_ERROR = 'FETCH_ERROR';
export const FETCH_GAMES_ERROR = 'FETCH_ERROR';

export const SET_FAVOURITE = 'SET_FAVOURITE';

export function fetchGames(date) {
  const url = `${ROOT_URL}year_${date.format('YYYY')}/month_${date.format('MM')}/day_${date.format('DD')}/master_scoreboard.json`;
  const request = axios.get(url); //returns a Promise object
  return {
    type: FETCH_GAMES,
    payload: request
  };
}

export function fetchGame(id) {
  const url = `${ROOT_URL}${id}/boxscore.json`;
  const request = axios.get(url); //returns a Promise object
  return {
    type: FETCH_GAME,
    payload: request
  };
}

export function setFavourite(favourite) {
  return {
    type: SET_FAVOURITE,
    payload: favourite
  };
}

