import React, { useState } from 'react';
import Highcharts from 'highcharts/highcharts-gantt';
import HighchartsReact from 'highcharts-react-official';
import { Modal, Box, Typography } from '@mui/material';



const GanttChart = () => {
  const [selectedData, setSelectedData] = useState(null);
  const [open, setOpen] = useState(false);

  const handlePointClick = (event) => {
    const point = event.point.options;
    const original = data.find(d => d.code === point.owner);
    if (original) {
      setSelectedData({
        ...original,
        utilisateurs: Math.floor(Math.random() * 50) + 10, // Valeur fictive
        effectifs: Math.floor(Math.random() * 100) + 30, // Valeur fictive
        direction: ['Technique', 'RH', 'Finance', 'Marketing'][Math.floor(Math.random() * 4)] // Exemple
      });
      setOpen(true);
    }
  };



  const data = [
    { code: "PN2025", date_entre: "12/02/2024", date_fin: "02/06/2025", cout_total: 256, intitule: "formation data" },
    { code: "PN2026", date_entre: "01/03/2024", date_fin: "15/06/2025", cout_total: 320, intitule: "formation en cybersécurité" },
    { code: "PN2027", date_entre: "10/04/2024", date_fin: "20/07/2025", cout_total: 290, intitule: "formation développement web" },
    { code: "PN2028", date_entre: "05/05/2024", date_fin: "10/08/2025", cout_total: 450, intitule: "formation DevOps" },
    { code: "PN2029", date_entre: "22/06/2024", date_fin: "15/09/2025", cout_total: 380, intitule: "formation cloud computing" },
    { code: "PN2030", date_entre: "01/07/2024", date_fin: "30/10/2025", cout_total: 275, intitule: "formation base de données" },
    { code: "PN2031", date_entre: "12/08/2024", date_fin: "05/11/2025", cout_total: 310, intitule: "formation en IA" },
    { code: "PN2032", date_entre: "15/09/2024", date_fin: "12/12/2025", cout_total: 330, intitule: "formation analyse de données" },
    { code: "PN2033", date_entre: "10/10/2024", date_fin: "20/01/2026", cout_total: 360, intitule: "formation gestion de projet" },
    { code: "PN2034", date_entre: "01/11/2024", date_fin: "28/02/2026", cout_total: 400, intitule: "formation Python avancé" }
  ];

  const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split("/").map(Number);
    return new Date(year, month - 1, day).getTime();
  };

  const series = [{
    name: 'Formations',
    data: data.map(item => ({
      name: item.intitule,
      start: parseDate(item.date_entre),
      end: parseDate(item.date_fin),
      owner: item.code,
      completed: {
        amount: Math.random()
      },
      events: {
        click: handlePointClick
      }
    }))
  }];

  const options = {
    chart: {
      plotBackgroundColor: 'rgba(128,128,128,0.02)',
      plotBorderColor: 'rgba(128,128,128,0.1)',
      plotBorderWidth: 1
    },
    title: {
      text: 'Planning des formations'
    },
    xAxis: [{
      currentDateIndicator: true,
      min: parseDate('01/01/2024'),
      max: parseDate('01/01/2027'),
      custom: {
        weekendPlotBands: true
      }
    }],
    yAxis: {
      staticScale: 30
    },
    tooltip: {
      pointFormat: '<b>{point.name}</b><br>Début : {point.start:%e %b %Y}<br>Fin : {point.end:%e %b %Y}<br>Code: {point.owner}'
    },
    series
  };

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'ganttChart'}
        options={options}
      />

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{ p: 4, bgcolor: 'background.paper', m: 'auto', mt: '10%', width: 400, borderRadius: 2 }}>
          {selectedData && (
            <>
              <Typography variant="h6">Détails de la formation</Typography>
              <Typography><strong>Intitulé:</strong> {selectedData.intitule}</Typography>
              <Typography><strong>Code:</strong> {selectedData.code}</Typography>
              <Typography><strong>Coût total:</strong> {selectedData.cout_total}k</Typography>
              <Typography><strong>Date début:</strong> {selectedData.date_entre}</Typography>
              <Typography><strong>Date fin:</strong> {selectedData.date_fin}</Typography>
              <Typography><strong>Effectifs:</strong> {selectedData.effectifs}</Typography>
              <Typography><strong>Utilisateurs:</strong> {selectedData.utilisateurs}</Typography>
              <Typography><strong>Direction:</strong> {selectedData.direction}</Typography>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default GanttChart;
