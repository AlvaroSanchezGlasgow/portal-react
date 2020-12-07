import React from 'react';

function AsideMenuComponent() {

    return (
        <>
            <aside class="menu">
                <p class="menu-label">
                   App Users Management
                </p>
                <ul class="menu-list">
                    <li><a href="/index">Users List</a></li>
                    <li><a href="/new-user">New Users</a></li>
                </ul>
                <p class="menu-label">
                    Clients Management
                </p>
                <ul class="menu-list">
                    <li><a href="/client-mng">Clients List</a></li>
                    <li><a href="/new-client">New Client</a></li>
                </ul>
            </aside>
        </>
    );
}

export default AsideMenuComponent;