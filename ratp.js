const Discord = require('discord.js')
const bot = new Discord.Client()
const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');


bot.on('message', message => {

    const [command, ...args] = message.content.split(' ');

  if(message.content.startsWith('!temps')){
    fetch(`https://api-ratp.pierre-grimaud.fr/v4/schedules/metros/${args[0]}/${args[1]}/${args[2]}`)
    .then(response => response.json())
    
    .then(data => {
        const metro = data.result.schedules;
        const call = data._metadata.call;
        const date = data._metadata.date;
        const version = data._metadata.version;

        const embed = new MessageEmbed()
            .setTitle(`Les prochains métros de la ligne ${args[0]}`)
            .setFooter(`Informations demandées à ${date}, \r${call}, ${version}`)
            .setColor('RANDOM')

        metro.forEach(element => {
            embed.addFields({
                name: element.destination,
                value: element.message,
            })
        });
        message.channel.send(embed)
    });
 }
 if(message.content.startsWith('!destination')){
    fetch(`https://api-ratp.pierre-grimaud.fr/v4/destinations/${args[0]}/${args[1]}/`)
    .then(response => response.json())
    .then(data =>{
        const destination = data.result.destinations;
        const embed = new MessageEmbed()
        .setTitle(`Les destinations possible pour le transport : ${args[0]} et la ligne : ${args[1]} sont :`)
        .setColor('RANDOM')
        destination.forEach(element =>{
            embed.addFields({
                name: element.name,
                value: 'Direction : ' + element.way,
            })

        })

        message.channel.send(embed)
    })
 }

 if(message.content.startsWith('!ligne')){
     fetch(`https://api-ratp.pierre-grimaud.fr/v4/lines/${args[0]}`)
     .then(response => response.json())
     .then(data =>{
        const transport = args[0]
        const ligne = data.result[transport];
        const embed = new MessageEmbed()
        .setTitle(`Les lignes possible pour le transport : ${transport} sont :`)
        .setColor('RANDOM')
        ligne.slice(0,50).forEach(element =>{
            embed.addFields({
                name: element.name,
                value: element.directions,
            })

        })

        message.channel.send(embed)
    })
 }
 if(message.content.startsWith('!stations')){
    fetch(`https://api-ratp.pierre-grimaud.fr/v4/stations/${args[0]}/${args[1]}?way=${args[2]}`)
    .then(response => response.json())
    .then(data =>{
        var i = 0;
        const stations = data.result.stations;
        const embed = new MessageEmbed()
        .setTitle(`Les stations du  ${args[0]} de la ligne ${args[1]} de la direction ${args[2]} sont :`)
        .setColor('RANDOM')
        stations.forEach(element =>{
             i = i+1;
            embed.addFields({
                name: element.name,
                value :'🚅'
                
            })
            .setDescription(`Il y a ${i} stations sur la ligne`)
        })
        message.channel.send(embed)
    })

 }

 if(message.content.startsWith('!traffic')){
    fetch(`https://api-ratp.pierre-grimaud.fr/v4/traffic/${args[0]}/${args[1]}`)
    .then(response => response.json())
    .then(data =>{
        const traffic = data.result;
        date = data._metadata.date;
        const embed = new MessageEmbed()
        .setTitle(`Le trafic pour le ${args[0]} ligne ${args[1]} est :`)
        .setColor('RANDOM')
            embed.addFields({
                name: traffic.title,
                value : traffic.message
            })
            .setFooter(date)
        
        message.channel.send(embed)
    })
 }
})
