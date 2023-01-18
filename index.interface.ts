export interface PokemonBasic {
  name: string;
  url: string;
}

export interface IAbility {
  is_hidden: boolean;
  slot: number;
}

export interface Pokemon extends PokemonBasic {
  base_experience: number;
  id: number;
  is_default: boolean;
  abilities: IAbility[];
  weight: 20;
  moves: IMove[];
}

export interface IMoveUnit {
  name: string;
  url: string;
}

export interface IVersionGroupDetail {
  level_learned_at: number;
  move_learn_method: IMoveUnit;
  version_group: IMoveUnit;
}

export interface IResponse {
  count: number;
  previous: string;
  next: string;
  results: PokemonBasic[];
}

export interface IMove {
  move: IMoveUnit;
  version_group_details: IVersionGroupDetail[];
}
