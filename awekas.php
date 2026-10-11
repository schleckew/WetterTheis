<?php
// awekas.php - holt die AWEKAS-Daten serverseitig und gibt sie als JSON an die Dashboard-Seite weiter.
// Neben wincheringen-wetter.html auf den Webspace legen.

$API_KEY = '1j4nK%2Bv4V3vfI76ZJxsqfAwl5RTrubLWEHObe4UTsr12g33rykVsEx6Mwpim5nNWSq87mCvWNFE8IvSsxxZ3MQ%3D%3D';   // Key aus dem AWEKAS-Profil
$CACHE_S = 60;                                     // so oft wie hoechstens pro Minute bei AWEKAS nachfragen

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function fail($code, $msg) {
    http_response_code($code);
    echo json_encode(['error' => $msg]);
    exit;
}

if (strpos($API_KEY, 'HIER_') === 0) fail(500, 'API-Key in awekas.php nicht eingetragen');

$cache = sys_get_temp_dir() . '/awekas-' . md5($API_KEY) . '.json';
if (is_file($cache) && time() - filemtime($cache) < $CACHE_S) {
    readfile($cache);
    exit;
}

$key = preg_match('/%[0-9A-Fa-f]{2}/', $API_KEY) ? $API_KEY : rawurlencode($API_KEY);
$url = 'https://api.awekas.at/current.php?key=' . $key;

$body = false;
if (function_exists('curl_init')) {
    $ch = curl_init($url);
    curl_setopt_array($ch, [CURLOPT_RETURNTRANSFER => true, CURLOPT_TIMEOUT => 15, CURLOPT_FOLLOWLOCATION => true]);
    $body = curl_exec($ch);
    curl_close($ch);
} else {
    $body = @file_get_contents($url, false, stream_context_create(['http' => ['timeout' => 15]]));
}

if ($body === false || $body === '') fail(502, 'AWEKAS nicht erreichbar');
$data = json_decode($body, true);
if (!is_array($data)) fail(502, 'Ungueltige Antwort von AWEKAS');

if (empty($data['error'])) @file_put_contents($cache, $body);
echo $body;
