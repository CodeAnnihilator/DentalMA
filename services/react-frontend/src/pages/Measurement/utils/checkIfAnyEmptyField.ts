import { IMeta } from 'library/common/interfaces/settings';

const checkIfAnyEmptyField = (obj: IMeta) => !!obj ? Object.keys(obj).some(f => !obj[f]) : true;

export default checkIfAnyEmptyField;