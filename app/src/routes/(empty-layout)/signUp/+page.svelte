<script lang="ts">
	import Button, { Label, Icon } from '@smui/button';
	import TextField from '@smui/textfield';
	import Checkbox from '@smui/checkbox';
	import { supabase } from '$lib/supabaseClient';
	import { goto } from '$app/navigation';

	import { onDestroy } from 'svelte';

	let email = '';
	let password = '';
	let loginError: boolean = false;
	let requestSent: boolean = false;
	let signUp_errorMessage: string = '';
	let signUp_succesfull = false;

	///////////////////// This is for signUp
	async function submit() {
		console.log('submit!: ' + email + '  ' + password);
		requestSent = true;
		const res = await signUp(email, password);
		requestSent = false;
	}
	async function signUp(email: string, password: string) {
		const { data, error } = await supabase.auth.signUp({
			email: email,
			password: password
		});

		if (error) {
			console.log('name', error.name);
			console.log('cause', error.cause);
			console.log('message', error.message);
			loginError = true;
			signUp_errorMessage = error.message;
		} else {
			signUp_succesfull = true;
			loginError = false;
		}
		console.log(data);
		console.log(error);
	}

	async function resetPassword() {
		const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
			redirectTo: 'https://example.com/update-password'
		});
	}

	function passwordvisible(visible: boolean) {
		return visible ? 'text' : 'password';
	}
	let show_password = false;
	let password_input_type = 'password';
	$: password_input_type = passwordvisible(show_password);
	// $: {
	// 	console.log('the password type is '+ password_input_type);
	// }
	// $: {
	// 	console.log('show_password is '+ show_password);
	// }

	///////////////////// This is for signUp
	async function checkForSession() {
		const { data, error } = await supabase.auth.getSession();
		console.log('session = ', data.session);
		if (data.session) {
			await goto('/');
		} else {
			console.log('email not yet confirmed');
		}
	}
	const checkForSessionInterval = setInterval(checkForSession, 1000);
	onDestroy(() => clearInterval(checkForSessionInterval));
	// if the user has confirmed their email, the session should exist
</script>

<div class="flex mx-auto m-3">
	<h2 class="text-xl text-sky-400">Willkommen bei Beyond</h2>
</div>

<div class="mdc-elevation--z8 mx-auto m-3 w-96 bg-white rounded-lg p-3">
	<form on:submit|preventDefault={submit} class="flex flex-col gap-4">
		<h2 class="font-bold mb-2 mx-auto">Hier registrieren</h2>
		<TextField variant="filled" bind:value={email} label="email" type="email" required />
		<TextField
			variant="filled"
			bind:value={password}
			label="password"
			type={password_input_type}
			required
		/>
		<div class="flex flex-row">
			<Checkbox bind:checked={show_password} /> <span class="my-auto">show password</span>
		</div>

		<Button fullwidth disabled={requestSent}>registrieren</Button>
		{#if loginError}
			<p class="text-red-700 mx-auto">{signUp_errorMessage}</p>
		{/if}
	</form>
</div>

<div class="flex mx-auto m-3">
	<p class="text-blue-700">
		<a href="/login">Du hast schon einen account? Hier einloggen.</a>
	</p>
</div>

{#if signUp_succesfull}
	<div class="flex mx-auto m-3">
		<p class="text-teal-700">Best??tige deine email adresse.</p>
	</div>
{/if}

<style>
	/* @tailwind components;
	@tailwind utilities; */
</style>
