const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    toggleSpinner(true);
    searchField.value = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.data))

}

//display all phones
const displaySearchResult = phones => {
    console.log(phones);
    const searchResult = document.getElementById('search-result');
    // display no phones found
    const noPhone = document.getElementById('no-found-message');
    if (phones.length === 0) {
        noPhone.classList.remove('d-none');
    }
    else {
        noPhone.classList.add('d-none');
    }
    searchResult.innerHTML = '';
    phones.forEach(phone => {
        console.log(phone);
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card box shadow">
            <img width='200ppx' src="${phone.image}" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p> ${phone.brand}</p>

                <button onclick="loadPhoneDetail('${phone.slug}')" type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Details</button>
            </div>
           
        </div>
        `;
        searchResult.appendChild(phoneDiv);
    })
    toggleSpinner(false);
}
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none');
    }
}

const loadPhoneDetail = phoneSlug => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneSlug}`
    //console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetail(data.data))

}

const displayPhoneDetail = phone => {
    console.log(phone);
    const modalTitle = document.getElementById('phoneDetailModalLabel');
    modalTitle.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
        <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No Release Date Found'}</p>
        <p>Storage: ${phone.mainFeatures ? phone.mainFeatures.storage : 'No Storage Information '}</p>
        <p>Others: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth Information'}</p>
        <p>Sensor: ${phone.mainFeatures.sensors ? phone.mainFeatures.sensors[0] : 'no sensor'}</p>
    `
}

