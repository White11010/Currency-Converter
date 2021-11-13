<template>
    <div class="cc-header">
        <div class="cc-header__nav">
            <router-link :to="{name: 'Converter'}" class="cc-header__nav-item">
                <p class="link">Converter</p>
            </router-link>
            <router-link :to="{name: 'Currencies'}" class="cc-header__nav-item">
                <p class="link">Currencies</p>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'cc-header',
    data() {
        return{
            
        }
    },
}
</script>

<style>
    .cc-header{
        width: 100%;
        height: 80px;
        text-transform: uppercase;
    }
    .cc-header__nav{
        height: inherit;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgb(69, 180, 134);
        
    }
    .cc-header__nav-item{
        margin: 0 2rem;
        color: white;
        font-weight: bold;
    }
    .cc-header__nav-item:hover{
        font-weight: bold;
    }
    .link{
	    position: relative;
    }
    .link::after{
    	display: block;
    	position: absolute;
    	left: 0;
    	width: 0;
    	height: 2px;
    	background-color: white;
    	content: "";
    	transition: width 0.3s ease-out;
    }
    .link:hover::after{
	  width: 100%
    }
</style>