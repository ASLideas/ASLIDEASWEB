'use client';
import React, { useState } from 'react';

export interface PortalInfo {
  id: string;
  nombre: string;
  subtitulo: string;
  logo: string;
  oficinaNum: string;
  leyes: string[];
  descripcionCorta: string;
  descripcionLarga?: string;
  serviciosClave?: string[];
  beneficios?: string[];
  enConstruccion?: boolean;
}

interface SalaVirtualB2BProps {
  isOpen: boolean;
  onClose: () => void;
  portalData?: PortalInfo;
  initialMode?: 'agendar' | 'cancelar';
}

export default function SalaVirtualB2B( {
  isOpen,
  onClose,
  portalData,
  initialMode = 'agendar',
}: SalaVirtualB2BProps) {
  const [modo, setModo] = useState<@agendar' | 'cancelar'>(initialMode);
  const [plataforma, setPlataforma] = useState<string>('1. Casa Matriz ASL Ideas SpA (Desarrollo B2B y Licencias)');
  const [motivo, setMotivo] = useState<string>('Videoreunion de Trabajo / Cotizacion de Vitrina B2B');
  const [fecha, setFecha] = useState<string>('');
  const [hora, setHora] = useState<string>('10:30 AM (Bloque Manana)');
  const [nombre, setNombre] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [reservaConfirmada, setReservaConfirmada] = useState<boolean>(false);

  const [codigoReserva, setCodigoReserva] = useState<string>('');
  const [emailCancelar, setEmailCancelar] = useState<string>('');
  const [cancelacionConfirmada, setCancelacionConfirmada] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleConfirmarReserva = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim() || !email.trim() || !fecha) {
      alert('Por favor completa todos los campos requeridos.');
      return;
    }
    setReservaConfirmada(true);
  };

  const handleConfirmarCancelacion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!codigoReserva.trim() || !emailCancelar.trim()) {
      alert('Por favor ingresa el codigo de reserva y tu correo registrado.');
      return;
    }
    setCancelacionConfirmada(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#676E5E]/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#E6E7D5] max-w-2xl w-full rounded-3xl border-2 border-[#97A884] shadow-2xl p-6 md:p-8 space-y-6 my-8 text-[#676E5E]">
        <div className="flex justify-between items-center border-b border-[#97A884]/40 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#CDD6A9] text-[#676E5E] px-3 py-1 rounded-full border border-[#97A884]">
              Sala de Video Reunion B2B
            </span>
            <h3 className="text-xl font-extrabold text-[#676E5E] mt-1">
              {modo === 'agendar' ? 'Reserva de Cita y Video Reunion' : 'Solicitud de Cancelacion'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-bold text-white bg-[#DC8D6C] hOver:bg-[#c37858] px-3.5 py-1.5 rounded-xl transition cursor-pointer"
          >
            Cerrar
          </button>
        </div>

        <div className="flex bg-[#CDD6A9]/50 p-1 rounded-2xl border border-[#97A884] text-xs font-bold">
          <button
            type="button"
            onClick={() => { setModo('agendar'); setReservaConfirmada(false); }}
            className={`flex-1 py-2.5 rounded-xl transition text-center cursor-pointer ${
           ��F����vvV�F"r�v&rղ3csdSTU�FW�B�v��FR6�F�rׇ2r�wFW�Bղ3csdSTU���fW#�FW�Bղ3csdSTU�p��Т�vV�F"f�FV�&WV�����'WGF����'WGF��G�S�&'WGF�� ���6Ɩ6�ײ�����6WD��F�v6�6V�"r��6WD6�6V�6���6��f�&�F�f�6R���Т6�74��S׷f�W����"�R&�V�FVB׆�G&�6�F���FW�B�6V�FW"7W'6�"����FW"G����F����v6�6V�"r�v&rղ4D3�Cd5�FW�B�v��FR6�F�rׇ2r�wFW�Bղ3csdSTU���fW#�FW�Bղ4D3�Cd5�p��Т�6�6V�"�&W&�w&� ���'WGF�����F�cࠢ���F����vvV�F"rbb��&W6W'f6��f�&�F����F�b6�74��S�&&r�v��FR�b&�V�FVB�'��&�&FW"&�&FW"ղ3�t��E�FW�B�6V�FW"76Rג�B6�F�rׇ2#�FF�b6�74��S�'r�"��6"ׂ�WF�&rղ44DCd��&�V�FVB�gV��f�W��FV�2�6V�FW"�W7F�g��6V�FW"FW�Bղ3csdSTU�f��B�W�G&&��BFW�Bׇ2#������F�c�ƃB6�74��S�'FW�B��rf��B�&��BFW�Bղ3csdSTU�#�f�FV�&WV���vV�FF���C��6�74��S�'FW�Bׇ2FW�Bղ3csdSTU��VF��r�&V��VB#��V��2&Vv�7G&F��6�F&�7G&��s����'&W���7G&��s���V���Ғ�V�66W6��6�FRf�FV�&WV���&V�F��7G&��s�fV6����7G&��s��2�7G&��s綆�&���7G&��s��6�F�V�f�F�GR6�'&V������F�b6�74��S�'�2&rղ4SdStCU�&�V�FVB׆�&�&FW"&�&FW"ղ3�t��E�FW�Bճ��f��B�����FW�Bղ3csdSTU�#�V��6RFR6�f�'GVâ�GG3���6ƖFV7vV"�fW&6V���6��f�'GV����F�c��'WGF��G�S�&'WGF�� ���6Ɩ6�ײ�����6WE&W6W'f6��f�&�F�f�6R����6��6R����Т6�74��S�&&rղ3csdSTU�FW�B�v��FRFW�Bׇ2f��B�&��B��b��"�R&�V�FVB׆���fW#�&rղ3S#S�F%�G&�6�F���7W'6�"����FW" ��f��fW"4��FV0���'WGF�����F�c������f�&���7V&֗C׶��F�T6��f�&�%&W6W'f�6�74��S�'76Rג�BFW�Bׇ2#��F�b6�74��S�'76Rג�#���&V�6�74��S�&f��B�&��BFW�Bղ3csdSTU�WW&66RG&6���r�v�FW"#���Ff�&��6W'f�6�������&V���6V�V7@�f�VS׷�Ff�&�Т��6��vSײ�R���6WE�Ff�&��R�F&vWB�f�VR�Т6�74��S�'r�gV���2&r�v��FR&�&FW"&�&FW"ղ3�t��E�&�V�FVB׆�FW�Bղ3csdSTU�f��B��VF�V��WFƖ�R����Rf�7W3�&�&FW"ղ3csdSTU� ����F���f�VS�#�66�G&��4��FV27�FW6'&����#$"�Ɩ6V�6�2�#��66�G&��4��FV27�FW6'&����#$"�Ɩ6V�6�2����F������F���f�VS�#"��tT�����6�VB��FVw&F�f#�"��tT�����6�VB��FVw&F�f���F������F���f�VS�#2�vV���W72vV"���f�֖V�F�FFF�#�2�vV���W72vV"���f�֖V�F�FFF����F������F���f�VS�#B�6&�GW&��6W7G&�#�B�6&�GW&��6W7G&����F������6V�V7C���F�cࠢ�F�b6�74��S�'76Rג�#���&V�6�74��S�&f��B�&��BFW�Bղ3csdSTU�WW&66RG&6���r�v�FW"#�"���F�f�FR�6�F�����&V���6V�V7@�f�VS׶��F�f�Т��6��vSײ�R���6WD��F�f�R�F&vWB�f�VR�Т6�74��S�'r�gV���2&r�v��FR&�&FW"&�&FW"ղ3�t��E�&�V�FVB׆�FW�Bղ3csdSTU�f��B��VF�V��WFƖ�R����Rf�7W3�&�&FW"ղ3csdSTU� ����F���f�VS�%f�FV�&WV���FRG&&���6�F��6���FRf�G&��#$"#�f�FV�&WV�f�6�FRG&&���6�F��6�f�6�FRf�G&��#$#���F������F���f�VS�$FV��7G&6���FR6�gGv&R66W6�&�ƖFB6�v�F�f�W�DT#�FV��7G&6�;6�FR6�gGv&R66W6�&�ƖFB6�v�F�f�W�DT���F������F���f�VS�$6��7V�F�&���7F�GV6����#$"#�6��7V�F�&���7F�GV6����#$#���F������6V�V7C���F�cࠠ��F�b6�74��S�&w&�Bw&�B�6��2�6Ӧw&�B�6��2�"v�B#��F�b6�74��S�'76Rג�#���&V�6�74��S�&f��B�&��BFW�Bղ3csdSTU�WW&66RG&6���r�v�FW"#�fV6�����&V��Ɩ�W@�G�S�&FFR �f�VS׶fV6�Т��6��vSײ�R���6WDfV6��R�F&vWB�f�VR�Т6�74��S�'r�gV���2&r�v��FR&�&FW"&�&FW"ղ3�t��E�&�V�FVB׆�FW�Bղ3csdSTU�f��B��VF�V��WFƖ�R����Rf�7W3�&�&FW"ղ3csdSTU� �&WV�&V@�����F�c��F�b6�74��S�'76Rג�#���&V�6�74��S�&f��B�&��BFW�Bղ3csdSTU�WW&66RG&6���r�v�FW"#�&��VR��&&������&V���6V�V7@�f�VS׶��&Т��6��vSײ�R���6WD��&�R�F&vWB�f�VR�Т6�74��S�'r�gV���2&r�v��FR&�&FW"&�&FW"ղ3�t��E�&�V�FVB׆�FW�Bղ3csdSTU�f��B��VF�V��WFƖ�R����Rf�7W3�&�&FW"ղ3csdSTU� ����F���f�VS�#��3��&��VR����#���3��&��VR�;�����F������F���f�VS�#�3��&��VR����#��3��&��VR�;�����F������F���f�VS�##���&��VR�VF��F��#�#���&��VR�VF��L:�����F������F���f�VS�#S�3��&��VRF&FR�#�S�3��&��VRF&FR����F������F���f�VS�#s���&��VRF&FR�#�s���&��VRF&FR����F������6V�V7C���F�c���F�cࠢ�F�b6�74��S�&w&�Bw&�B�6��2�6Ӧw&�B�6��2�"v�B#��F�b6�74��S�'76Rג�#���&V�6�74��S�&f��B�&��BFW�Bղ3csdSTU�WW&66RG&6���r�v�FW"#����'&R6���WF��V�&W6����&V��Ɩ�W@�G�S�'FW�B �f�VS׶���'&WТ��6��vSײ�R���6WD���'&R�R�F&vWB�f�VR�Т�6V���FW#�$���'&R���7F�GV6�f�6���� �6�74��S�'r�gV���2&r�v��FR&�&FW"&�&FW"ղ3�t��E�&�V�FVB׆�FW�Bղ3csdSTU��WFƖ�R����Rf�7W3�&�&FW"ղ3csdSTU� �&WV�&V@�����F�c��F�b6�74��S�'76Rג�#���&V�6�74��S�&f��B�&��BFW�Bղ3csdSTU�WW&66RG&6���r�v�FW"#�6�'&V�V�V7G,;&�6�����&V��Ɩ�W@�G�S�&V��� �f�VS׶V���Т��6��vSײ�R���6WDV��R�F&vWB�f�VR�Т�6V���FW#�&6��F7F�V�&W6�6� �6�74��S�'r�gV���2&r�v��FR&�&FW"&�&FW"ղ3�t��E�&�V�FVB׆�FW�Bղ3csdSTU��WFƖ�R����Rf�7W3�&�&FW"ղ3csdSTU� �&WV�&V@�����F�c���F�cࠢ�'WGF��G�S�'7V&֗B �6�74��S�'r�gV��&rղ3csdSTU���fW#�&rղ3S#S�F%�FW�B�v��FRFW�Bׇ2f��B�&��B��2�R&�V�FVB�'��G&�6�F���6�F�r��B�B�B7W'6�"����FW" ��6��f�&�"�vV�W&"6�f�'GV����'WGF�����f�&�����Р����F����v6�6V�"rbb��6�6V�6���6��f�&�F����F�b6�74��S�&&r�v��FR�b&�V�FVB�'��&�&FW"&�&FW"ղ4D3�Cd5�FW�B�6V�FW"76Rג�B6�F�rׇ2#�ƃB6�74��S�'FW�B��rf��B�&��BFW�Bղ4D3�Cd5�#�&W6W'f6�6V�F���C��6�74��S�'FW�Bׇ2FW�Bղ3csdSTU��VF��r�&V��VB#��&WV�;6�6��<;6F�v��7G&��s�6�F�v�&W6W'f���7G&��s��6�F�6�6V�F&V�6�'&V��7G&��s�V���6�6V�'���7G&��s������'WGF��G�S�&'WGF�� ���6Ɩ6�ײ�����6WD6�6V�6���6��f�&�F�f�6R����6��6R����Т6�74��S�&&rղ3csdSTU�FW�B�v��FRFW�Bׇ2f��B�&��B��b��"�R&�V�FVB׆���fW#�&rղ3S#S�F%�G&�6�F���7W'6�"����FW" ��f��fW"�6�F����'WGF�����F�c������f�&���7V&֗C׶��F�T6��f�&�$6�6V�6����6�74��S�'76Rג�BFW�Bׇ2#��F�b6�74��S�'76Rג�#���&V�6�74��S�&f��B�&��BFW�Bղ4D3�Cd5�WW&66RG&6���r�v�FW"#�<;6F�v�FR&W6W'f�%UB�����&V��Ɩ�W@�G�S�'FW�B �f�VS׶6�F�v�&W6W'fТ��6��vSײ�R���6WD6�F�v�&W6W'f�R�F&vWB�f�VR�Т�6V���FW#�$V��4�Ӄ�# �6�74��S�'r�gV���2&r�v��FR&�&FW"&�&FW"ղ4D3�Cd5�&�V�FVB׆�FW�Bղ3csdSTU��WFƖ�R����Rf�7W3�&�&FW"ղ4D3�Cd5� �&WV�&V@�����F�cࠢ�F�b6�74��S�'76Rג�#���&V�6�74��S�&f��B�&��BFW�Bղ4D3�Cd5�WW&66RG&6���r�v�FW"#�6�'&V�&Vv�7G&F������&V��Ɩ�W@�G�S�&V��� �f�VS׶V���6�6V�'Т��6��vSײ�R���6WDV���6�6V�"�R�F&vWB�f�VR�Т�6V���FW#�&6�'&V�V�V����6� �6�74��S�'r�gV���2&r�v��FR&�&FW"&�&FW"ղ4D3�Cd5�&�V�FVB׆�FW�Bղ3csdSTU��WFƖ�R����Rf�7W3�&�&FW"ղ4D3�Cd5� �&WV�&V@�����F�cࠢ�'WGF��G�S�'7V&֗B �6�74��S�'r�gV��&rղ4D3�Cd5���fW#�&rղ633s�S��FW�B�v��FRFW�Bׇ2f��B�&��B��2�R&�V�FVB�'��G&�6�F���6�F�r��B�B�B7W'6�"����FW" ��6��f�&�"6�6V�6�;6���'WGF�����f�&�����Р���F�c���F�c�����