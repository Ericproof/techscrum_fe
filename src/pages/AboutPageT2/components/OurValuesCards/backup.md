.container {
    max-width: 972px;
    width: 100%;
    margin: 50px auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.cardOfValuesContainer{
    h1 {
        font-size: 35px;
        font-weight: lighter;
        width: 100%;
    }

    p {
        font-size: 23px;
        color: #858484;
        margin: 0 6px 60px 6px;
        width: 100%;
    }
}

.card {
    margin: 50px 0 0 0;
    display: flex;
    flex-direction: row;
    box-shadow: 0px 0px 7px -3px #000000;
    border-radius: 10px;
    transition: transform 0.2s;
    max-width:475px;
    &:hover {
        box-shadow: 0px 2px 5px -1px #000000;
        transform: translate(0, -5px);
    }

    .cardDescription {
        width: 400px;
        font-size: 21px;
        text-align: left;
        border-radius: 10px 0 0 10px;
        margin: auto 40px auto 50px;
        
        }

    .cardImg {
        width: 286px;
        border-radius: 0 10px 10px 0;
    }

}
    
@media screen and (min-width: 992px) {
    .container {
        width: 956px;
        height: 700.9px;
    }

    .card{
        width: 39%;
        height: 27%;
    }
    
}