/**
 * Coppys Bot - Baza danych modułów i funkcji bota
 */
const BotFeaturesData = [
  {
    id: 'moderation',
    icon: '◈',
    badge: 'BEZPIECZEŃSTWO',
    title: {
      pl: 'Inteligentna Moderacja',
      en: 'Smart Moderation',
      de: 'Intelligente Moderation',
      fr: 'Modération Intelligente',
      ja: 'スマートモデレーション'
    },
    description: {
      pl: 'Automatyczne wykrywanie spamu, ochrona przed rajdami (Anti-Raid), filtry wulgaryzmów oraz szybkie komendy moderacyjne.',
      en: 'Automated spam detection, Anti-Raid protection, profanity filters, and instant moderation commands.',
      de: 'Automatische Spam-Erkennung, Anti-Raid-Schutz, Beleidigungsfilter und schnelle Moderationsbefehle.',
      fr: 'Détection automatique du spam, protection Anti-Raid, filtres de vulgarité et commandes de modération rapides.',
      ja: 'スパムの自動検出、アンチレイド保護、不適切な l 言語フィルター、および迅速なモデレーションコマンド。'
    },
    capabilities: [
      'AutoMod & Ochrona przed niepożądanymi linkami',
      'Masowe czyszczenie wiadomości (/purge)',
      'System ostrzeżeń (Warns), wyciszeń i banów',
      'Logowanie akcji moderacyjnych w czasie rzeczywistym'
    ]
  },
  {
    id: 'verification',
    icon: '◉',
    badge: 'BRAMKA BEZPIECZEŃSTWA',
    title: {
      pl: 'Weryfikacja & Anti-Bot',
      en: 'Verification & Anti-Bot',
      de: 'Verifizierung & Anti-Bot',
      fr: 'Vérification & Anti-Bot',
      ja: '認証 & アンチボット'
    },
    description: {
      pl: 'Interaktywna bramka wejściowa. Wymagaj akceptacji regulaminu i weryfikacji przed odblokowaniem kanałów serwera.',
      en: 'Interactive gateway system. Require terms agreement and verification before unlocking server channels.',
      de: 'Interaktives Gateway-System. Erfordern Sie die Zustimmung zu den Regeln vor der Freischaltung von Kanälen.',
      fr: 'Système de passerelle interactive. Exigez l\'acceptation du règlement avant de déverrouiller les salons.',
      ja: 'インタラクティブな ゲートウェイシステム。 サーバー チャンネル を 解放 する 前 に 規約 への 同意 を 義務付けます。'
    },
    capabilities: [
      'Weryfikacja jednym kliknięciem lub kodem',
      'Automatyczne nadawanie roli "Zweryfikowany"',
      'Personalizowane wiadomości powitalne z powiadomieniem',
      'Blokowanie kont podejrzanych i masowych botów'
    ]
  },
  {
    id: 'logging',
    icon: '☷',
    badge: 'AUDYT & LOGI',
    title: {
      pl: 'Dedykowany Dziennik Zdarzeń',
      en: 'Dedicated Audit Logs',
      de: 'Dedizierte Audit-Protokolle',
      fr: 'Journaux d\'Audit Dédiés',
      ja: '専用 監査ログ'
    },
    description: {
      pl: 'Rejestruj każdą istotną akcję na serwerze: edycje i usunięcia wiadomości, zmiany ról oraz dołączenia użytkowników.',
      en: 'Track every important server action: message edits & deletions, role updates, and member join events.',
      de: 'Verfolgen Sie jede wichtige Serveraktion: Nachrichtenbearbeitungen, Rollenänderungen und Beitritte.',
      fr: 'Suivez chaque action importante du serveur : modifications de messages, mises à jour de rôles et arrivées.',
      ja: 'メッセージの編集・削除、ロールの変更、 ユーザーの参加 など、 重要な サーバー アクション を すべて 記録します。'
    },
    capabilities: [
      'Dedykowane kanały dla osobnych typów zdarzeń',
      'Podgląd usuniętej treści wiadomości',
      'Śledzenie zmian uprawnień i ról członków',
      'Eksport logów do celów administracyjnych'
    ]
  },
  {
    id: 'automation',
    icon: '◆',
    badge: 'AUTOMATYZACJA & ZARZĄDZANIE',
    title: {
      pl: 'Zarządzanie Społecznością',
      en: 'Community Automation',
      de: 'Community-Automatisierung',
      fr: 'Automatisations Communautaires',
      ja: 'コミュニティ自動化'
    },
    description: {
      pl: 'Dynamiczny panel WWW pozwalający na wygodną konfigurację bota bez konieczności wpisywania skomplikowanych komend.',
      en: 'Dynamic web dashboard allowing convenient bot configuration without complex command syntax.',
      de: 'Dynamisches Web-Dashboard zur einfachen Bot-Konfiguration ohne komplexe Befehlssyntax.',
      fr: 'Tableau de bord web dynamique permettant une configuration facile du bot sans commandes complexes.',
      ja: '複雑な コマンド 構文 を 使わずに、 Web ダッシュボード から 簡単 に ボット を 設定 できます。'
    },
    capabilities: [
      'Autoryzacja OAuth2 przez Discord i Google',
      'Synchronizacja ustawień w czasie rzeczywistym',
      'Zarządzanie uprawnieniami kanonicznymi',
      'Kompatybilność z nowym API Discorda'
    ]
  }
];

if (typeof window !== 'undefined') {
  window.BotFeaturesData = BotFeaturesData;
}