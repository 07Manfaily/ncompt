import React from 'react';
import Chart from 'react-apexcharts';
import * as XLSX from 'xlsx';

const ApexChart = () => {
  const [selectedType, setSelectedType] = React.useState('escompte');
  const opera = ["ESCOMPTE", "ENCAISSE"]

  const dataByType = {
    escompte: {
      name: 'Escompte',
      data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
    },
    encaisse: {
      name: 'Encaisse',
      data: [1.5, 2.2, 3.5, 8.2, 3.8, 2.9, 2.5, 1.8, 1.2, 0.6, 0.4, 0.1]
    }
  };
  const data = [
    ['Mois', `${selectedType === 'escompte' ? 'Taux d\'escompte (%)' : 'Taux d\'encaisse (%)'}`],
    ['Jan', dataByType[selectedType].data[0]],
    ['Fév', dataByType[selectedType].data[1]],
    ['Mar', dataByType[selectedType].data[2]],
    ['Avr', dataByType[selectedType].data[3]],
    ['Mai', dataByType[selectedType].data[4]],
    ['Jun', dataByType[selectedType].data[5]],
    ['Jul', dataByType[selectedType].data[6]],
    ['Aoû', dataByType[selectedType].data[7]],
    ['Sep', dataByType[selectedType].data[8]],
    ['Oct', dataByType[selectedType].data[9]],
    ['Nov', dataByType[selectedType].data[10]],
    ['Déc', dataByType[selectedType].data[11]]
  ];



  const chartOptions = {
    chart: {
      height: 350,
      type: 'bar',
      toolbar: {
        show: true,
        export: {
          csv: {
            filename: selectedType === opera[0].toLowerCase() ? 'escompte' : 'encaisse',
            columnDelimiter: ',',
            headerCategory: 'Mois',
            headerValue: selectedType === 'escompte' ? 'Taux d\'escompte (%)' : 'Taux d\'encaisse (%)',
          },
          svg: {
            filename: selectedType === opera[0].toLowerCase() ? 'escompte' : 'encaisse',
          },
          png: {
            filename: selectedType === opera[0].toLowerCase() ? 'escompte' : 'encaisse',
          }
        },
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
          customIcons: [{
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14,2 14,8 20,8"></polyline></svg>',
            title: 'Télécharger Excel',
            class: 'custom-icon',
            index: -1,
            click: () => {
              // Créer un nouveau classeur
              const ws = XLSX.utils.aoa_to_sheet(data);
              const wb = XLSX.utils.book_new();
              XLSX.utils.book_append_sheet(wb, ws, "Données");

              // Télécharger le fichier
              const fileName = selectedType === opera[0].toLowerCase() ? 'escompte.xlsx' : 'encaisse.xlsx';
              XLSX.writeFile(wb, fileName);
            }
          }]
        }
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: 'top',
        },
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val + "%";
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ["#304758"]
      }
    },
    xaxis: {
      categories: ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"],
      position: 'top',
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          }
        }
      },
      tooltip: {
        enabled: true,
      }
    },
    yaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: function (val) {
          return val + "%";
        }
      }
    },
    title: {
      text: selectedType === 'escompte' ? 'Taux d\'Escompte Mensuel en Argentine, 2002' : 'Taux d\'Encaisse Mensuel en Argentine, 2002',
      floating: true,
      offsetY: 330,
      align: 'center',
      style: {
        color: '#444'
      }
    }
  };

  const series = [{
    name: selectedType === 'escompte' ? 'Escompte' : 'Encaisse',
    data: dataByType[selectedType].data
  }];

  return (
    <div className="p-4">
      <div className="mb-5">
        <select 
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          style={{
            backgroundColor: 'white',
            minWidth: '200px'
          }}
        >
          <option value="escompte">Escompte</option>
          <option value="encaisse">Encaisse</option>
        </select>
      </div>
      <div id="chart">
        <Chart 
          options={chartOptions}
          series={series}
          type="bar"
          height={350}
        />
      </div>
    </div>
  );
};

export default ApexChart;