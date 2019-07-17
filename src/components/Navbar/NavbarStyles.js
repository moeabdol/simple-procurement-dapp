import styled from 'styled-components';

export const AccountTypeSpan = styled.span`
  color: ${props => (props.type === 'buyer' ? '#92FD00' : '#FF0303')};
`;
