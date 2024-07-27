export interface ComponentProps {
  id: number | string;
  type: string;
  text: string;
  fontWeight: number;
  fontSize: number;
  x: number;
  y: number;
}

export interface ModalProps {
  text: string;
  fontWeight: number;
  fontSize: number;
  labelType: string;
}
